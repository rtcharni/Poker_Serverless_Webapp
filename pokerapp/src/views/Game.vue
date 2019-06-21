<template>
  <div>
    <v-container>
      <v-layout row>
        <v-img class="card" v-bind:src="clubs10" height="auto" width="60"></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/3_of_diamonds.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/5_of_hearts.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/7_of_spades.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/Ace_of_clubs.svg.png')"
          height="auto"
          width="60"
        ></v-img>
      </v-layout>
    </v-container>
    <button @click="changecard" type="button">PRESS</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { cards } from "../gameplay/Deck";
import { Deck } from '../gameplay/Deck';

const a = new Deck();
console.log(a.take5CardsFromDeck())

export default Vue.extend({
  name: "game",
  components: {},
  data: () => ({
    clubs10: require("../assets/cards/10_of_clubs.svg.png"),
    ace: cards[0].ace
  }),
  methods: {
    changecard() {
      this.clubs10 = this.ace;
    }
  }
});
</script>

<style scoped>
</style>

