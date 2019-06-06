<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">

        <span>Online Poker</span>
        <span class="font-weight-light"> - can you be the best player?!</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
       <v-btn flat>
        <router-link to="/login">Login</router-link>
      </v-btn>
      <v-btn flat>
        <router-link to="/signup">Signup</router-link>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: "login",
  components: {},
  data: () => ({}),
  methods: {}
});
</script>

<style scoped>
</style>

