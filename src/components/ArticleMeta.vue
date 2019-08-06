<template>
  <div class="article-meta d-flex justify-content-between">
    <div class="media text-muted">
      <a @click="toProfile()">
        <img v-if="article.author.image" :src="AVATAR_URL + article.author.image" class="author-img mr-2" />
      </a>

      <div class="info media-body small">
        <a @click="toProfile()">
          <h5>{{ article.author.username }}</h5>
        </a>
        <div class="date d-block">{{ article.createdAt | date }}</div>
      </div>
    </div>

    <div class="my-auto">
      <template v-if="actions">
        <ArticleActions
          :article="article"
          :canModify="isCurrentUser()" />
      </template>
      <template v-else>
        <button class="btn-no" v-if="!actions" v-on:click="toggleUpvote"
          :disabled="!currentUser || (currentUser && isCurrentUser())"
          :class="{
            'text-dark': article.upvoted,
            'text-secondary': !article.upvoted
          }"
          data-toggle="tooltip" data-placement="top" title="I like it.">
          <font-awesome-icon icon="thumbs-up" />
          <span v-if="article.upvotesCount > 0" class="counter"> &nbsp;{{ article.upvotesCount }} </span>
        </button>
        <button class="btn-no ml-3" v-if="!actions" v-on:click="toggleDownvote"
          :disabled="!currentUser || (currentUser && isCurrentUser())"
          :class="{
            'text-dark': article.downvoted,
            'text-secondary': !article.downvoted
          }"
          data-toggle="tooltip" data-placement="top" title="I like it.">
          <font-awesome-icon icon="thumbs-down" />
          <span v-if="article.downvotesCount > 0" class="counter"> &nbsp;{{ article.downvotesCount }} </span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleActions from "./ArticleActions";
import {
  UPVOTE_ARTICLE_ADD,
  UPVOTE_ARTICLE_REMOVE,
  DOWNVOTE_ARTICLE_ADD,
  DOWNVOTE_ARTICLE_REMOVE
} from "../store/actions.type";
import { AVATAR_URL } from "../common/config";

export default {
  name: "ArticleMeta",
  data() {
    return {
      AVATAR_URL
    };
  },
  components: {
    ArticleActions
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    toggleUpvote() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.upvoted ? UPVOTE_ARTICLE_REMOVE : UPVOTE_ARTICLE_ADD;
      this.$store.dispatch(action, this.article.slug);
    },
    toggleDownvote() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.downvoted ? DOWNVOTE_ARTICLE_REMOVE : DOWNVOTE_ARTICLE_ADD;
      this.$store.dispatch(action, this.article.slug);
    },
    toProfile() {
      this.$router.push({ name: "profile",  params: { username: this.article.author.username }});
    }
  }
};
</script>

<style>
  .author-img {
    height:50px;
    border-radius: 50px;
    float: left;
  }

  a {
    cursor: pointer;
  }

  .btn-no {
    border: none;
    background-color: inherit; 
  }

</style>
