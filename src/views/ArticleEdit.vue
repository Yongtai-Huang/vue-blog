<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors" />
          <h3 class="text-dark">{{article.slug ? 'Update' : 'Create'}} Post </h3>

          <div v-if="article.image">
            <img  class="article-img py-2 mx-auto d-block"
              :src="ARTICLE_IMAGE_URL + article.image" alt="Image">

            <div class="text-center py-2">
              <input type="checkbox" id="removeImage" v-model="removeImage" class="form-check-input">
              <label for="removeImage" class="form-check-label">Remove Image</label>
            </div>
          </div>

          <form v-on:submit.prevent="onSubmit(article.slug);">
            <div :disabled="inProgress">
              <div class="form-group">
                <label class="text-muted" for="title"><strong>Title</strong></label>
                <input
                  type="text" id="title"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"/>
              </div>
              <div class="form-group">
                <label class="text-muted" for="uploadFile"><strong>Main Image</strong></label>
                <input type="file" @change="fileChange($event)" id="uploadFile"
                  accept="image/*" class="form-control py-1">
              </div>
              <div class="form-group">
                <label class="text-muted" for="desc"><strong>Description</strong></label>
                <input
                  type="text" id="desc"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"/>
              </div>

              <div class="form-group">
                <label class="text-muted" for="tag"><strong>Tag</strong></label>
                <input
                  type="text" id="tag"
                  class="form-control"
                  placeholder="Type a tag and press Enter"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput)"/>
                <div class="tag-list">
                  <span
                    class="badge badge-light m-2"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index">
                      <font-awesome-icon class="text-danger" icon="times" v-on:click="removeTag(tag)"/>
                      {{ tag }}
                    </span>
                </div>
              </div>
              
              <div class="form-group">
                <label class="text-muted" for="body"><strong>Body</strong></label>
                <vueEditor id="editor"
                  useCustomImageHandler
                  @imageAdded="handleImageAdded" v-model="article.body">
                </vueEditor>
              </div>
              
            </div>
            <button
              :disabled="inProgress"
              class="btn btn-primary"
              type="submit">
              {{article.slug ? 'Update' : 'Create'}} Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import ListErrors from "../components/ListErrors";
import { ARTICLE_IMAGE_URL } from "../common/config";
import { ARTICLE_IMG_URL } from "../common/config";
import {
  ARTICLE_CREATE,
  ARTICLE_EDIT,
  FETCH_ARTICLE,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_EDIT_ADD_IMAGE,
  ARTICLE_EDIT_REMOVE_IMAGE,
  ARTICLE_RESET_STATE,
  ARTICLE_EDIT_ADD_IMGFILELIST
} from "../store/actions.type";
import { ArticlesService } from "../common/articles.service";
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  components: { ListErrors, VueEditor },
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_ARTICLE,
        to.params.slug,
        to.params.previousArticle
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    next();
  },
  data() {
    return {
      ARTICLE_IMAGE_URL,
      ARTICLE_IMG_URL,
      tagInput: null,
      inProgress: false,
      errors: {},
      removeImage: null,
    };
  },
  computed: {
    ...mapGetters(["article"])
  },
  methods: {
    onSubmit(slug) {
      // Incase did not press Enter
      if (this.tagInput) {
        this.addTag(this.tagInput); 
      }

      if (this.removeImage) {
        this.$store.dispatch(ARTICLE_EDIT_REMOVE_IMAGE, this.removeImage.toString());
      }

      let imgFileList = this.retrieveImgs(this.article.body);
      if (imgFileList.length) {
        this.$store.dispatch(ARTICLE_EDIT_ADD_IMGFILELIST, imgFileList);
      }
      
      let action = slug ? ARTICLE_EDIT : ARTICLE_CREATE;
      this.inProgress = true;
      
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "article",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    removeTag(tag) {
      this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag);
    },
    addTag(tag) {
      this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag);
      this.tagInput = null;
    },
    fileChange(event) {
      this.$store.dispatch(ARTICLE_EDIT_ADD_IMAGE, event.target.files);
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append('file', file, file.name)

      ArticlesService.uploadImg(this.article.slug, formData)
      .then((result) => {
        Editor.insertEmbed(cursorLocation, 'image', this.ARTICLE_IMG_URL + result.data.file);
        resetUploader();
      })
      .catch((err) => {
        console.log(err);
      })
    },
    retrieveImgs(body) {
      // Retrieve image file names in article.body
      let imgFileList = [];
      let elem= document.createElement("div");
      elem.innerHTML = body;
      let images = elem.getElementsByTagName("img");
      for(let i=0; i < images.length; i++) {
        let splitedUrl = images[i].src.split('/');
        let filename = splitedUrl[splitedUrl.length-1];
        imgFileList.push(filename);
      }
      return imgFileList;
    }
  }
};
</script>
<style scoped>
  .article-img {
    margin-top: 3em 0 .5em 0;
    max-width: 300px;
    max-height: 300px;
    border-radius: 5px;
  }
</style>
