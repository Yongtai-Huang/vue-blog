<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'articles' }">
        <span className="text-danger"><strong>Vue Blog</strong></span>
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

       <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!isAuthenticated" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'articles' }">
              Articles
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'login' }">
              <i class="ion-compose"></i>Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'register' }">
              <i class="ion-compose"></i>Sign up
            </router-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'articles' }">
              Articles
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{ name: 'article-edit' }">
              <font-awesome-icon icon="edit" />&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'settings' }">
              <font-awesome-icon icon="cog" />&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item" v-if="currentUser.username">
            <a class="nav-link" @click="logout" href="#">Logout</a>
          </li>
          <li class="nav-item" v-if="currentUser.username">
            <router-link class="nav-link" active-class="active" exact
              :to="{name: 'profile', params: { username: currentUser.username }}">
              <img v-if="currentUser.image" :src="AVATAR_URL + currentUser.image" class="user-img mr-2" />
              <span class="username">{{ currentUser.username }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { AVATAR_URL } from "../common/config";
import { LOGOUT } from "../store/actions.type";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  data() {
    return {
      AVATAR_URL
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "articles" });
      });
    }
  }
};
</script>

<style>
  nav {
    background-color: #004B91 !important;
  }

  .username {
    text-transform: capitalize;
  }

  .user-img {
    height: 26px;
    border-radius: 50px;
    float: left;
  }
</style>
