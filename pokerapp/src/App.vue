<template>
  <v-app>
   <router-view></router-view>
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
