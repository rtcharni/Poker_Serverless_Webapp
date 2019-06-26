<template>
  <div>
    <v-container>
      <v-layout row>
        <v-img class="card" v-bind:src="clubs10" height="auto" width="60"></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/3_of_Diamonds.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/5_of_Hearts.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/7_of_Spades.svg.png')"
          height="auto"
          width="60"
        ></v-img>
        <v-img
          class="card"
          v-bind:src="require('../assets/cards/1_of_Clubs.svg.png')"
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
import { checkHandForWins } from '../gameplay/WinningTable';


// const a = new Deck();
// const b = a.take5CardsFromDeck()
// console.log(b)
// checkHandForWins(b);

export default Vue.extend({
  name: "game",
  components: {},
  data: () => ({
    clubs10: require("../assets/cards/10_of_Clubs.svg.png"),
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

