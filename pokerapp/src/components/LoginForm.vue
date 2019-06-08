<template>
  <div>
    <h1 class="display-2 font-weight-thin mb-3 mt-5">Vuetify.js</h1>
    <h4 class="subheading">Build your application today!</h4>
    <v-card light>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Login</h3>
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
    handleLoginClick() {
      if (this.$refs.loginform.validate()) {
        console.log("VALIDATE");
        //   this.snackbar = true
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

