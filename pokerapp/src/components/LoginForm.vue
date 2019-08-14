<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card light>
          <div class="spinnerDiv">
            <v-progress-circular
              v-if="loading"
              size="120"
              width="7"
              indeterminate
              color="primary"
              class="spinner"
            ></v-progress-circular>
          </div>

          <v-card-title primary-title>
            <div>
              <h3 class="display-2 font-font-font-weight-medium mt-2">Login</h3>
            </div>
          </v-card-title>

          <v-card-text>
            <v-form ref="loginform" v-model="valid" lazy-validation>
              <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
              ></v-text-field>

              <v-btn :disabled="!valid" color="success" @click="handleLoginClick">Login</v-btn>

              <v-btn flat color="error" @click="handleResetClick">Clear</v-btn>
            </v-form>
          </v-card-text>

          <Snackbar
            id="snackbar"
            v-bind:snackbar="snackbar"
            v-bind:timeout="0"
            v-bind:text="snackbarText"
            v-bind:color="snackbarColor"
          />
          <!-- <v-card-actions> -->
          <!-- </v-card-actions> -->
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snackbar from "./Snackbar.vue";
import { getUser } from "../utils/apiRequests";

export default Vue.extend({
  name: "loginform",
  components: { Snackbar },
  data: () => ({
    loading: false,
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    valid: false,
    username: "",
    usernameRules: [
      (v: string) => !!v || "Username is required"
      // (v: string) =>
      //   (v && v.length >= 3) || "Username must be at least 3 characters"
    ],
    password: "",
    passwordRules: [
      (v: string) => !!v || "Password is required"
      // (v: string) =>
      //   (v && v.length >= 5) || "Password must be at least 5 characters"
    ]
  }),
  methods: {
    async handleLoginClick() {
      if ((<any>this.$refs.loginform).validate()) {
        console.log(this);
        this.loading = true;
        const response = await getUser(this.username, this.password);
        console.log(response);
        if (response.success) {
          this.loading = false;
          this.showAndHideSnackbar(response.msg, "info", 2000);
          setTimeout(() => {
            this.$router.push({
              name: "game",
              params: { user: response.user, loggedIn: "true", auth: response.auth }
            });
          }, 3000);
        } else {
          this.loading = false;
          this.showAndHideSnackbar(response.msg, "error", 3000);
          return;
        }
      }
    },
    handleResetClick() {
      (<any>this.$refs.loginform).reset();
    },
    showAndHideSnackbar(message: string, color: string, duration: number) {
      this.snackbarText = message;
      this.snackbarColor = color;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, duration);
    }
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.msg) {
      this.showAndHideSnackbar(this.$route.params.msg, "info", 3000);
    }
  }
});
</script>

<style scoped>
.spinner {
  position: absolute;
}
.spinnerDiv {
  display: flex;
  justify-content: center;
}
</style>

