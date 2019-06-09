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
      
      <h1>This is about page</h1>
    </v-layout>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '../components/Navbar.vue';
export default Vue.extend({
  name: "about",
  components: {
    Navbar
  },
  data: () => ({}),
  methods: {}
})
</script>

<style scoped>
</style>
