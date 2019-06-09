<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card light>
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
      v-bind:text="'Username already exists...'"
      v-bind:color="'error'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Snackbar from "./Snackbar.vue";

export default Vue.extend({
  name: "signupform",
  components: {
    Snackbar
  },
  data: () => ({
    snackbar: false,
    valid: false,
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length >= 3) || "Username must be at least 3 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 6) || "Name must be at least 6 characters"
    ]
  }),
  methods: {
    async handleSignupClick() {
      if (this.$refs.loginform.validate()) {
        console.log(this);
        const user = await (await fetch('GetUserURL')).json();
        if (!user) {
            // Create user, send api call, ok message -> redirect..
            const headers: HeadersInit = {set: ('Content-Type','Application/json') }
            const success = await fetch('CreateUser',{method: "POST", headers: {set: {'Content-Type':'Application/json'}}})
        } else {
            this.showAndHideSnackbar();
            return;
        }
      }
    },
    handleResetClick() {
      this.$refs.loginform.reset();
    },
    showAndHideSnackbar() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 4000);
    }
  }
});
</script>

<style scoped>
</style>

