<template>
  <div class="article-page mt-5">
    <div class="banner">
      <div class="container">
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
        <h3 class="text-uppercase mt-2">{{ article.title }}</h3>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content p-3">
        <div class="col-sm-12">
          <img v-if="article.image" class="article-img mx-auto d-block"
            :src="ARTICLE_IMAGE_URL + article.image" alt="Image">

          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list list-inline list-unstyled">
            <li v-for="(tag, index) of article.tagList" :key="tag + index" class="list-inline-item">
              <ArticleTag :name="tag" />
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <ArticleCommentEditor
            v-if="isAuthenticated"
            :slug="slug"
            :userImage="currentUser.image" />
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p>

          <h5 class="text-primary mt-5"><strong>Comments</strong></h5>
          <ArticleComment
            v-for="(comment, index) in articleComments"
            :slug="slug"
            :articleComment="comment"
            :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import ArticleMeta from "../components/ArticleMeta";
import ArticleComment from "../components/ArticleComment";
import ArticleCommentEditor from "../components/ArticleCommentEditor";
import ArticleTag from "../components/ArticleTag";
import { FETCH_ARTICLE, FETCH_ARTICLE_COMMENTS } from "../store/actions.type";
import { ARTICLE_IMAGE_URL } from "../common/config";

export default {
  name: "Article",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    ArticleMeta,
    ArticleComment,
    ArticleCommentEditor,
    ArticleTag
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_ARTICLE, to.params.slug),
      store.dispatch(FETCH_ARTICLE_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  data() {
    return {
      ARTICLE_IMAGE_URL
    };
  },
  computed: {
    ...mapGetters(["article", "currentUser", "articleComments", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
