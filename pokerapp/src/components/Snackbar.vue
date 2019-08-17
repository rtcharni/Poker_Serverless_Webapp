<template>
  <!-- <div> -->
    <v-snackbar
      :value="snackbar"
      :timeout="timeout"
      :color="color"
      :top="true"
      :absolute="true"
      :auto-height="true"
      class="snackbar"
    >
      {{ text }}
      <!-- <v-btn color="pink" flat @click="snackbar = false">Close</v-btn> -->
    </v-snackbar>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from "vue";

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
    methods: {}
  })
});
</script>

<style scoped>
</style>




