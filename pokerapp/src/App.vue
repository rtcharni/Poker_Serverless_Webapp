<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>

        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
  <router-view/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Login from './views/Login';
import Signup from './views/Signup';


export default {
  name: 'App',
  components: {
    HelloWorld,
    Signup,
    Login
  },
  data () {
    return {
      //
    }
  }
}
</script>
