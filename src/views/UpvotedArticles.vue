<template>
  <div class="profile-page">
    <ArticleList :upvoted="upvoted" :items-per-page="5" />
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "UpvotedArticles",
  components: {
    ArticleList
  },
  computed: {
    upvoted() {
      return this.$route.params.username;
    }
  }
};
</script>
