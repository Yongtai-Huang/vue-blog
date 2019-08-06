<template>
  <ul class="tag-list list-unstyled">
    <li class="badge badge-warning mx-1"
      v-for="(tag, index) of tags"
      :key="index">
      <h6 v-text="tag" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "ArticleTagList",
  props: {
    tags: Array
  }
};
</script>
