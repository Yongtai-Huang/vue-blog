<template>
  <div class="card mt-3">
    <div class="card-body">
      <p class="card-text comment-body p-2">{{ articleComment.body }}</p>
    </div>

    <div class="card-footer d-flex media">
      <router-link :to="{ name: 'profile', params: { username: articleComment.author.username } }">
        <img v-if="articleComment.author.image" :src="AVATAR_URL + articleComment.author.image" class="comment-author-img mr-2" />
      </router-link>

      <div class="media-body small">
        <router-link class="comment-author text-dark"
          :to="{ name: 'profile', params: { username: articleComment.author.username } }">
          <h6>{{ articleComment.author.username }}</h6>
        </router-link>
        <small class="date-posted d-block">{{ articleComment.createdAt | date }}</small>
      </div>

      <div v-if="isCurrentUser" class="mod-options ml-auto text-muted"
        data-toggle="tooltip" data-placement="top" title="Delete comment">
        <font-awesome-icon icon="trash" v-on:click="destroy(slug, articleComment.id);"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ARTICLE_COMMENT_DESTROY } from "../store/actions.type";
import { AVATAR_URL } from "../common/config"; 

export default {
  name: "ArticleComment",
  data() {
    return {
      AVATAR_URL
    };
  },
  props: {
    slug: { type: String, required: true },
    articleComment: { type: Object, required: true }
  },
  computed: {
    isCurrentUser() {
      if (this.currentUser.username && this.articleComment.author.username) {
        return this.articleComment.author.username === this.currentUser.username;
      }
      return false;
    },
    ...mapGetters(["currentUser"])
  },
  methods: {
    destroy(slug, articleCommentId) {
      this.$store.dispatch(ARTICLE_COMMENT_DESTROY, { slug, articleCommentId });
    }
  }
};
</script>

<style scoped>
  .comment-author-img {
    height: 50px;
    border-radius: 50px;
    float: left;
  }

  .comment-body {
    white-space: pre-line;
  }
</style>
