<template>
  <router-link
    :to="{ name: 'articles-by-tag', params: { tag: name } }">
    <h5 class="badge badge-warning mx-1 px-3 py-2">{{ name }}</h5>
  </router-link>
</template>

<script>
export default {
  name: "ArticleTag",
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>


