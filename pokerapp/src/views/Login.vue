<template>
  <div>
    <Navbar></Navbar>

    <v-img
      v-bind:src="require('../assets/playing-cards_free_background_image_2210x1473.jpg')"
      max-height="700"
    >
    <v-layout
      align-center
      column
      justify-center
    >
      
      <LoginForm></LoginForm>
      <v-btn color="primary" small depressed to="/signup">Signup here!</v-btn>
    </v-layout>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from '../components/LoginForm.vue';
import Navbar from '../components/Navbar.vue';


export default Vue.extend({
  name: "login",
  components: {
    LoginForm,
    Navbar
  },
  data: () => ({}),
  methods: {}
});
</script>

<style scoped>
</style>

