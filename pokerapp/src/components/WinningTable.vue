<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Winning table</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>Royal flush:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 50}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Straight flush:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 20}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Four of a kind:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 15}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Full house:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 10}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Flush:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 7}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Straight:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 6}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Three of a kind:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 3}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Two pair:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 2}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>One pair:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{bet * 1}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "winningtable",
  components: {},
  props: {
    bet: Number
  },
  data: () => ({}),
  methods: {}
});
</script>

<style scoped>
</style>

