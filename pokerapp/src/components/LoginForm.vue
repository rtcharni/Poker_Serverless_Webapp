<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card light>
          <v-card-title primary-title>
            <div>
              <h3 class="display-2 font-font-font-weight-medium mt-2">Login</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form ref="loginform" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>

              <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

              <v-btn :disabled="!valid" color="success" @click="handleLoginClick">Login</v-btn>

              <v-btn flat color="error" @click="handleResetClick">Clear</v-btn>
            </v-form>
          </v-card-text>

          <!-- <v-card-actions> -->
          <!-- </v-card-actions> -->
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Vuetify from 'vuetify'

export default Vue.extend({
  name: "loginform",
  components: {},
  data: () => ({
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
    async handleLoginClick() {
      if (this.$refs.loginform.validate()) {
        console.log(this);
        const user = await (await fetch("GetUserURL")).json();
        if (user) {
          this.$router.push({
            name: "game",
            params: { user: "user", loggedIn: true }
          });
        } else {
          // this.showAndHideSnackbar();
          // User doesnt exist DO something show snackbar maybe!
          return;
        }
      }
    },
    handleResetClick() {
      this.$refs.loginform.reset();
    }
  }
});
</script>

<style scoped>
</style>

