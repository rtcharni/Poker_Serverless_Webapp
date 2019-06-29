<template>
  <div class="container">
    <!-- <v-container> -->
    <!-- <v-layout row> -->
    <div v-if="!loading" class="row">
      <div class="col">
        <v-img class="card" v-bind:src="cards[0].img" height="auto" width="150"></v-img>
        <v-btn @click="lockCard" round outline color="indigo" value="0" class>Lock</v-btn>
      </div>
      <div class="col">
        <v-img
          class="card"
          v-bind:src="cards[1].img"
          height="auto"
          width="150"
        ></v-img>
        <v-btn @click="lockCard" round outline color="indigo" value="1">Lock</v-btn>
      </div>
      <div class="col">
        <v-img
          class="card"
          v-bind:src="cards[2].img"
          height="auto"
          width="150"
        ></v-img>
        <v-btn @click="lockCard" round outline color="indigo" value="2">Lock</v-btn>
      </div>
      <div class="col">
        <v-img
          class="card"
          v-bind:src="cards[3].img"
          height="auto"
          width="150"
        ></v-img>
        <v-btn @click="lockCard" round outline color="indigo" value="3">Lock</v-btn>
      </div>
      <div class="col">
        <v-img
          class="card"
          v-bind:src="cards[4].img"
          height="auto"
          width="150"
        ></v-img>
        <v-btn @click="lockCard" round outline color="indigo" value="4">Lock</v-btn>
      </div>

      <!-- </v-layout>
      </v-container>-->
      <!-- <div class="row">
        <v-btn round outline color="indigo">Lock</v-btn>
        <v-btn round outline color="indigo">Lock</v-btn>
        <v-btn round outline color="indigo">Lock</v-btn>
        <v-btn round outline color="indigo">Lock</v-btn>
      </div>-->
    </div>
    <v-btn @click="dealChangeCards" color="indigo">Deal!</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { cards } from "../gameplay/Deck";
import { Deck } from "../gameplay/Deck";
import { checkHandForWins } from "../gameplay/WinningTable";
import { Card } from "../models/interfaces";

// const a = new Deck();
// const b = a.take5CardsFromDeck()
// console.log(b)
// checkHandForWins(b);

export default Vue.extend({
  name: "game",
  components: {},
  data: () => ({
    loading: true,
    deck: new Deck(),
    cards: [] as Card[],
    lockedCards: [] as Number[],
    card0: Object as () => Card,
    card1: Object as () => Card,
    card2: Object as () => Card,
    card3: Object as () => Card,
    card4: Object as () => Card,

    clubs10: require("../assets/cards/10_of_Clubs.svg.png"),
    ace: cards[0].ace
  }),
  methods: {
    // dealChangeCards() {
    //   this.cards = this.deck.take5CardsFromDeck().map(card => card);
    // },
    lockCard(event:any) {
      // console.log(event)
      const number: number = event.target.value ? parseInt(event.target.value) : parseInt(event.target.parentElement.value);
      if (this.lockedCards.indexOf(number) === -1) {
        this.lockedCards.push(number)
      } else {
        this.lockedCards = this.lockedCards.filter(x => x !== number);
      }
      console.log(this.lockedCards)
    },
    dealChangeCards() {
      this.cards = this.cards.map((card, i) => this.lockedCards.indexOf(i) === -1 ? this.deck.takeCardFromDeck() : card);
    }
  },
  created() {
    console.log("created!");
    this.cards = this.deck.take5CardsFromDeck().map(card => card);
    this.loading = false;
    
  }
});
</script>

<style scoped>
</style>

