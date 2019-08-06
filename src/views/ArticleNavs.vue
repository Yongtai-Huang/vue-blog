<template>
  <div class="article-navs">
    <div class="banner">
      <div class="container text-center">
        <h1 class="logo-font">Your Dream</h1>
        <p>A place to share your dream.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  :to="{ name: 'articles-follow' }"
                  class="nav-link"
                  active-class="active">
                  Articles Following
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="{ name: 'articles' }"
                  exact
                  class="nav-link"
                  active-class="active">
                  Articles
                </router-link>
              </li>

              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{ name: 'articles-by-tag', params: { tag } }"
                  class="nav-link"
                  active-class="active">
                  <font-awesome-icon icon="hashtag" />{{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <h5>Article Tags</h5>
            <div class="tag-list">
              <ArticleTag v-for="(tag, index) in articleTags" :name="tag" :key="index" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleTag from "../components/ArticleTag";
import { FETCH_ARTICLE_TAGS } from "../store/actions.type";

export default {
  name: "ArticleNavs",
  components: {
    ArticleTag
  },
  mounted() {
    this.$store.dispatch(FETCH_ARTICLE_TAGS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "articleTags"]),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
