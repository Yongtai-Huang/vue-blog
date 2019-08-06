<template>
  <div class="article-preview">
    <hr />
    <ArticleMeta isPreview :article="article" />
    <h4 class="text-dark mt-2" v-text="article.title" />
    <p class="text-dark" v-text="article.description" />
    <router-link :to="articleLink" class="preview-link d-flex justify-content-center">
      <small class="text-muted">
        <span class="text-uppercase">Read more</span>&nbsp;&nbsp;
        <font-awesome-icon icon="chevron-right" />
      </small> 
    </router-link>
  </div>
</template>

<script>
import ArticleMeta from "./ArticleMeta";

export default {
  name: "ArticlePreview",
  components: {
    ArticleMeta
  },
  props: {
    article: { type: Object, required: true }
  },
  computed: {
    articleLink() {
      return {
        name: "article",
        params: {
          slug: this.article.slug
        }
      };
    }
  }
};
</script>


