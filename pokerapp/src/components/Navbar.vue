<template>
  <div>
    <v-toolbar >
      <v-toolbar-title class="headline text-uppercase">
        <span>Online Poker</span>
        <span class="font-weight-light"> - can you be the best player?</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-4" flat to="/about">About</v-btn>
      <v-btn flat to="/login">Login</v-btn>
      <v-btn flat to="/signup">Signup</v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "navbar",
  components: {},
  data: () => ({}),
  methods: {}
});
</script>

<style scoped>
</style>

