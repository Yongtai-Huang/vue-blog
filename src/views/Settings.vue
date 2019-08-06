<template>
  <div class="settings-page">
    <div class="container page">
      
      <div class="row">
        <div v-if="currentUser.image" class="col-md-4 col-sm-12">
          <img :src="AVATAR_URL + currentUser.image" class="profile-img pt-3 mx-auto d-block" />
          <div class="text-center py-2">
            <input type="checkbox" id="removePhoto" v-model="removePhoto" class="form-check-input" />
            <label for="removePhoto" class="form-check-label">Remove Photo</label>
          </div>
        </div>
        <div class="col-md-8 col-sm-12" v-bind:class="{ 'offset-md-2': !currentUser.image }">
          <h1>Your Settings</h1>
          <form @submit.prevent="updateSettings();">
            <div class="form-group">
              <label class="text-muted" for="uploadFile"><strong>User Picture</strong></label>
              <input type="file" @change="fileChange($event)" id="uploadFile"
                accept="image/*" class="form-control py-1">
            </div>

            <div class="form-group">
              <label class="text-muted" for="username"><strong>Username</strong></label>
              <input
                class="form-control"
                type="text"
                id="username"
                v-model="currentUser.username"
                placeholder="Your username"
              />
            </div>
            <div class="form-group">
              <label class="text-muted" for="bio"><strong>Biography</strong></label>
              <textarea
                class="form-control"
                id="bio"
                rows="8"
                v-model="currentUser.bio"
                placeholder="Short bio about you"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="text-muted" for="email"><strong>Email</strong></label>
              <input
                class="form-control"
                id="email"
                type="text"
                v-model="currentUser.email"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label class="text-muted" for="password"><strong>Password</strong></label>
              <input
                class="form-control"
                id="password"
                type="password"
                v-model="currentUser.password"
                placeholder="Password"
              />
            </div>
            <button class="btn btn-primary">
              Update Settings
            </button>
          </form>

          <hr />
          <button @click="logout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT, UPDATE_USER } from "../store/actions.type";
import { AVATAR_URL } from "../common/config";

export default {
  name: "Settings",
  data() {
    return {
      fileList: null,
      removePhoto: null,
      AVATAR_URL
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    updateSettings() {
      const user = {
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: this.currentUser.password,
        bio: this.currentUser.bio,
        fileList: this.fileList && this.fileList.length > 0 ? this.fileList : null,
        removePhoto: this.removePhoto ? this.removePhoto.toString() : ''
      };

      this.$store.dispatch(UPDATE_USER, user).then(() => {
        this.$router.push({ name: 'profile', params: { username: this.currentUser.username }});
      });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "articles" });
      });
    },
    fileChange(event) {
      this.fileList = event.target.files;
    }
  }
};
</script>

<style scoped>
  .profile-img {
    margin-top: 3em 0 .5em 0;
    max-width: 300px;
    max-height: 300px;
    border-radius: 5px;
  }
</style>

