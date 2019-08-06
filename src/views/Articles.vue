<template>
  <div class="articles"><ArticleList type="articles" /></div>
</template>
<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "Articles",
  components: {
    ArticleList
  }
};
</script>
