<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">

        <span>Online Poker</span>
        <span class="font-weight-light"> - can you be the best player?!</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
       <v-btn flat to="/login">
        Login
      </v-btn>
      <v-btn flat to="/signup">
        Signup
      </v-btn>
    </v-toolbar>
    <v-img
      src="https://picjumbo.com/wp-content/uploads/playing-cards_free_stock_photos_picjumbo_DSC07167-2210x1473.jpg"
      max-height="700"
    >
    <v-layout
      align-center
      column
      justify-center
    >
      
      <SignupForm></SignupForm>
      <v-btn color="primary" small depressed to="/signup">Already have account? Login here!</v-btn>
    </v-layout>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignupForm from '../components/SignupForm.vue';

export default Vue.extend({
  name: 'signup',
  components: {
    SignupForm
  },
  data: () => ({

  }),
  methods: {

  },

});
</script>

<style scoped>

</style>

