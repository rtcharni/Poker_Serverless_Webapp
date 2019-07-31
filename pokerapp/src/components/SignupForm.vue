<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card light>
          <div class="spinnerDiv">
            <v-progress-circular v-if="loading" size="120" width="7" indeterminate color="primary" class="spinner"></v-progress-circular>
            </div>
          <v-card-title primary-title>
            <div>
              <h3 class="display-2 font-font-font-weight-medium mt-2">Signup</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="loginform" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="usernameRules"
                label="Choose username"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Choose password"
                required
              ></v-text-field>

              <v-btn :disabled="!valid" color="success" @click="handleSignupClick">Create User</v-btn>

              <v-btn flat color="error" @click="handleResetClick">Clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>

    <Snackbar
      id="snackbar"
      v-bind:snackbar="snackbar"
      v-bind:timeout="0"
      v-bind:text="snackbarText"
      v-bind:color="snackbarColor"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snackbar from "./Snackbar.vue";
import { createUser } from "../utils/apiRequests";

export default Vue.extend({
  name: "signupform",
  components: {
    Snackbar
  },
  data: () => ({
    loading: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    valid: false,
    username: "",
    usernameRules: [
      (v: string) => !!v || "Username is required",
      (v: string) =>
        (v && v.length >= 3) || "Username must be at least 3 characters"
    ],
    password: "",
    passwordRules: [
      (v: string) => !!v || "Password is required",
      (v: string) =>
        (v && v.length >= 5) || "Password must be at least 5 characters"
    ]
  }),
  methods: {
    async handleSignupClick() {
      if ((<any>this.$refs.loginform).validate()) {
        console.log(this);
        this.loading = true;
        const response = await createUser(this.username, this.password);
        console.log(response);
        if (response.success) {
          this.showAndHideSnackbar(response.msg, "success", 3000);
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 3000);
          this.loading = false;
        } else {
          this.loading = false;
          this.showAndHideSnackbar(response.msg, "error", 4000);
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

