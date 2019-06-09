<template>
  <!-- <div> -->
    <v-snackbar
      :value="snackbar"
      :timeout="timeout"
      :color="color"
      :top="true"
    >
      {{ text }}
      <!-- <v-btn color="pink" flat @click="snackbar = false">Close</v-btn> -->
    </v-snackbar>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from "vue";
// import Vuetify from 'vuetify'

export default Vue.extend({
  name: "snackbar",
  components: {},
  props: {
    timeout: Number,
    snackbar: Boolean,
    text: String,
    color: String
  },
  data: () => ({
    // snackbar: false,
    // y: "",
    // x: "",
    // timeout: 4000,
    methods: {
      handleLoginClick() {
        console.log("VALIDATE");
        //   this.snackbar = true
      }
    }
  })
});
</script>

<style scoped>
</style>




