<template>
  <div class="articles-follow">
    <ArticleList type="follow" :items-per-page="itemsPerPage" />
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "ArticlesFollow",
  components: {
    ArticleList
  },
  data() {
    return {
      itemsPerPage: 5
    }
  }
};
</script>
