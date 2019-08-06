<template>
  <div class="profile-page">
    <ArticleList :downvoted="downvoted" :items-per-page="itemsPerPage" />
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "DownvotedArticles",
  components: {
    ArticleList
  },
  data() {
    return {
      itemsPerPage: 5
    }
  },
  computed: {
    downvoted() {
      return this.$route.params.username;
    }
  }
};
</script>