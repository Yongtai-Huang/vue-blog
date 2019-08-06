<template>
  <!-- Current user is the author -->
  <span v-if="canModify">
    <router-link class="text-muted"
      :to="{ name: 'article-edit', params: { slug: this.article.slug } }"
      data-toggle="tooltip" data-placement="top" title="Edit article">
      <font-awesome-icon icon="edit" />
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn-no text-muted" @click="deleteArticle"
      data-toggle="tooltip" data-placement="top" title="Delete article">
      <font-awesome-icon icon="trash" />
    </button>
  </span>
  <!-- Current user is not the author -->
  <span v-else>
    <button class="btn-no text-muted" @click.prevent="toggleFollow()">
      <font-awesome-icon v-if="!profile.following" icon="plus" /> <span>&nbsp;</span>
      <font-awesome-icon v-if="profile.following" icon="minus" /> <span>&nbsp;</span>
      <span
        >{{ profile.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}
      </span>
    </button>

    <button class="btn-no ml-3" @click="toggleUpvote"
      :class="{
        'text-dark': article.upvoted,
        'text-secondary': !article.upvoted
      }"
      data-toggle="tooltip" data-placement="top" title="I like it.">
      <font-awesome-icon icon="thumbs-up" />
      <span v-if="article.upvotesCount > 0" class="counter">&nbsp;{{ article.upvotesCount }} </span>
    </button>
    <button class="btn-no ml-3" @click="toggleDownvote"
      :class="{
        'text-dark': article.downvoted,
        'text-secondary': !article.downvoted
      }"
      data-toggle="tooltip" data-placement="top" title="I dislike it.">
      <font-awesome-icon icon="thumbs-down" />
        <span v-if="article.downvotesCount > 0" class="counter">&nbsp;{{ article.downvotesCount }} </span>
    </button>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import {
  UPVOTE_ARTICLE_ADD,
  UPVOTE_ARTICLE_REMOVE,
  DOWNVOTE_ARTICLE_ADD,
  DOWNVOTE_ARTICLE_REMOVE,
  FETCH_PROFILE,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW,
  ARTICLE_DELETE
} from "@/store/actions.type";

export default {
  name: "ArticleActions",
  props: {
    article: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  components: { },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {username: this.article.author.username});
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"])
  },
  methods: {
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
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.profile.following
        ? PROFILE_UNFOLLOW
        : PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    },
    async deleteArticle() {
      try {
        await this.$store.dispatch(ARTICLE_DELETE, this.article.slug);
        this.$router.push("/");
      } catch (err) {
        // console.error(err);
      }
    }
  }
};
</script>
<style scoped>
  .btn-no {
    border: none;
    background-color: inherit; 
  }
</style>

