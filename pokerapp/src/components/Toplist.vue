<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Show Toplist</v-btn>
      </template>
      <v-tabs fixed-tabs background-color="indigo" dark>
        <v-tab>Money record</v-tab>
        <v-tab-item>
          <v-card>
            <v-list dense dark rounded>
              <v-list-tile>
                <v-list-tile-content class="align-center">Pertti</v-list-tile-content>
                <v-list-tile-content class="align-center">540</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="align-center">Jarkko</v-list-tile-content>
                <v-list-tile-content class="align-center">454</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content class="align-center">Matilda</v-list-tile-content>
                <v-list-tile-content class="align-center">234</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab>Most money</v-tab>
        <v-tab-item><v-card><v-list dense dark rounded><v-list-tile></v-list-tile></v-list></v-card></v-tab-item>
        <v-tab>Most wins</v-tab>
        <v-tab-item><v-card><v-list dense dark rounded><v-list-tile></v-list-tile></v-list></v-card></v-tab-item>
        <v-tab>Most loses</v-tab>
        <v-tab-item><v-card><v-list dense dark rounded><v-list-tile></v-list-tile></v-list></v-card></v-tab-item>
      <!-- <v-btn class="" color="primary" @click="dialog = false">Close</v-btn> -->
      </v-tabs>
      <v-spacer></v-spacer>
    
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "toplist",
  components: {},
  props: {},
  data: () => ({
    dialog: false
  }),
  methods: {}
});
</script>

<style scoped>
</style>

