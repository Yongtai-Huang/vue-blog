<template>
  <div>
    <ul class="pagination">
      <li v-for="page in pages"
        :data-test="`page-link-${page}`"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page)">
        <a class="page-link" href v-text="page" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticlePagination",
  props: {
    pages: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(goToPage) {
      if (goToPage === this.currentPage) return;
      this.$emit("update:currentPage", goToPage);
    },
    paginationClass(page) {
      return {
        "page-item": true,
        active: this.currentPage === page
      };
    }
  }
};
</script>
