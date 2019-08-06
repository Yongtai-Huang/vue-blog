<template>
  <div class="articles-by-tag">
    <ArticleList :tag="tag" :items-per-page="itemsPerPage"/>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "ArticlesByTag",
  components: {
    ArticleList
  },
  data() {
    return {
      itemsPerPage: 5
    }
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
