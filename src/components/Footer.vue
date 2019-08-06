<template>
  <footer>
    <div class="container d-flex justify-content-between">
      <router-link class="logo-font" :to="{ name: 'articles', params: {} }">
        YouDream
      </router-link>
      <div class="attribution">
        <a rel="noopener noreferrer" target="blank" href="https://webkang.com">
          WebKang
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style>
footer {
  padding: .75em 0;
  left: 0;
  bottom: 0;
  height: 45px;
  width: 100%;
  background-color: #333;
  text-align: left;
  z-index: 99;
}
</style>
