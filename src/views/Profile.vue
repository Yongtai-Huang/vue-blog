<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-8 offset-md-2 d-flex my-3">
            <div class="pr-3">
              <img v-if="profile.image" :src="AVATAR_URL + profile.image" class="profile-img pt-3" />
            </div>
            <div>
              <h4>{{ profile.username }}</h4>
              <p class="bio">{{ profile.bio }}</p>
              <div v-if="isCurrentUser()">
                <router-link
                  :to="{ name: 'settings' }">
                  <font-awesome-icon icon="user-edit" />
                </router-link>
              </div>
              <div v-else>
                <a v-if="profile.following"
                  @click.prevent="unfollow()"
                  data-toggle="tooltip" data-placement="top" title="Unfollow.">
                  <font-awesome-icon icon="minus" /> &nbsp;Unfollow
                  {{ profile.username }}
                </a>
                <a v-if="!profile.following"
                  @click.prevent="follow()"
                  data-toggle="tooltip" data-placement="top" title="Follow">
                  <font-awesome-icon icon="plus" /> &nbsp;Follow
                  {{ profile.username }}
                </a>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile' }">
                  Your Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'upvoted-articles' }">
                  Upvoted Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'downvoted-articles' }">
                  Downvoted Articles
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AVATAR_URL } from "../common/config";
import { FETCH_PROFILE, PROFILE_FOLLOW, PROFILE_UNFOLLOW } from "../store/actions.type";

export default {
  name: "Profile",
  components: { },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, this.$route.params);
  },
  data() {
    return {
      AVATAR_URL
    };
  },
  computed: {
    ...mapGetters(["currentUser", "profile", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.profile.username) {
        return this.currentUser.username === this.profile.username;
      }
      return false;
    },
    follow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      this.$store.dispatch(PROFILE_FOLLOW, this.$route.params);
    },
    unfollow() {
      this.$store.dispatch(PROFILE_UNFOLLOW, this.$route.params);
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch(FETCH_PROFILE, to.params);
    }
  }
};
</script>

<style scoped>
  .profile-img {
    margin-top: 2em 0 .5em 0;
    max-width: 300px;
    max-height: 300px;
    border-radius: 5px;
  }

  .bio {
    white-space: pre-line;
  }
</style>

