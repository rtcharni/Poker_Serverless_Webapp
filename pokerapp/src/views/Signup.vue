<template>
  <div>

   <Navbar></Navbar>

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
      <v-btn color="primary" small depressed to="/login">Already have account? Login here!</v-btn>
    </v-layout>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignupForm from '../components/SignupForm.vue';
import Navbar from '../components/Navbar.vue';

export default Vue.extend({
  name: 'signup',
  components: {
    SignupForm,
    Navbar
  },
  data: () => ({

  }),
  methods: {

  },
});
</script>

<style scoped>

</style>

