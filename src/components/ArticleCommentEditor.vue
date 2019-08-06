<template>
  <div>
    <list-errors :errors="errors"> </list-errors>
    <form
      class="card comment-form"
      v-on:submit.prevent="onSubmit(slug, articleComment);">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="articleComment"
          placeholder="Write a comment..."
          rows="3">
        </textarea>
      </div>
      <div class="card-footer d-flex">
        <button :disabled="!articleComment" class="btn btn-danger ml-auto">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import ListErrors from "./ListErrors";
import { ARTICLE_COMMENT_CREATE } from "../store/actions.type";

export default {
  name: "ArticleCommentEditor",
  components: { ListErrors },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      articleComment: this.content || null,
      errors: {}
    };
  },
  methods: {
    onSubmit(slug, articleComment) {
      if (!articleComment) {
        return;
      }
      this.$store
      .dispatch(ARTICLE_COMMENT_CREATE, { slug, articleComment })
      .then(() => {
        this.articleComment = null;
        this.errors = {};
      })
      .catch(({ response }) => {
        this.errors = response.data.errors;
      });
    }
  }
};
</script>

<style>
  .comment-author-img {
    height: 50px;
    border-radius: 50px;
    float: left;
  }
</style>

