<template>
  <v-app>
   <router-view></router-view>
  </v-app>
</template>

<script>
import Login from './views/Login';
import Signup from './views/Signup';


export default {
  name: 'App',
  components: {
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
