<template>
  <div class="container">
    <!-- <v-container> -->
    <!-- <v-layout row> -->
    <div v-if="!loading" class="row">
      <div class="col">
        <v-img class="card" v-bind:src="cards[0].img" height="auto" width="150"></v-img>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(0) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="0"
          class
        >{{lockedCards.indexOf(0) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>
      <div class="col">
        <v-img class="card" v-bind:src="cards[1].img" height="auto" width="150"></v-img>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(1) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="1"
        >{{lockedCards.indexOf(1) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>
      <div class="col">
        <v-img class="card" v-bind:src="cards[2].img" height="auto" width="150"></v-img>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(2) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="2"
        >{{lockedCards.indexOf(2) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>
      <div class="col">
        <v-img class="card" v-bind:src="cards[3].img" height="auto" width="150"></v-img>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(3) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="3"
        >{{lockedCards.indexOf(3) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>
      <div class="col">
        <v-img class="card" v-bind:src="cards[4].img" height="auto" width="150"></v-img>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(4) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="4"
        >{{lockedCards.indexOf(4) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>
      <!-- </v-layout>
      </v-container>-->
    </div>
    <div>
      <v-text-field
        :disabled="isGameOn"
        v-model="bet"
        class="betInput"
        prefix="$"
        type="number"
        label="Place bet"
        solo
      ></v-text-field>
    </div>
    <v-btn
      @click="isGameOn ? dealChangeCards() : dealNewCards()"
      color="indigo"
      class="dealBtn"
    >{{isGameOn ? 'Change cards' : 'Deal'}}</v-btn>

    <Statistics v-bind:player="player" />

    <Snackbar
      id="snackbar"
      v-bind:snackbar="snackbar"
      v-bind:timeout="0"
      v-bind:text="'No enough money...'"
      v-bind:color="'error'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Deck } from "../gameplay/Deck";
import { checkHandForWins } from "../gameplay/WinningTable";
import { Card } from "../models/interfaces";
import { Player, createMockPlayer } from "../gameplay/Player";
import Snackbar from "../components/Snackbar.vue";
import Statistics from "../components/Statistics.vue";
import cardDealSound from "../utils/utils";

export default Vue.extend({
  name: "game",
  components: { Snackbar, Statistics },
  data: () => ({
    audio: Object,
    snackbar: false,
    bet: 0,
    dealBtn: {
      text: "Deal"
    },
    loading: true,
    isGameOn: false,
    deck: new Deck(),
    cards: [] as Card[],
    lockedCards: [] as Number[],
    player: Object() as Player
  }),
  methods: {
    lockCard(event: any) {
      if (!this.isGameOn) {
        return;
      }
      // console.log(event)
      const number: number = event.target.value
        ? parseInt(event.target.value)
        : parseInt(event.target.parentElement.value);
      if (this.lockedCards.indexOf(number) === -1) {
        this.lockedCards.push(number);
      } else {
        this.lockedCards = this.lockedCards.filter(x => x !== number);
      }
    },
    dealChangeCards() {
      this.cards = this.cards.map((card, i) =>
        this.lockedCards.indexOf(i) === -1 ? this.deck.takeCardFromDeck() : card
      );
      this.lockedCards = [];
      // Hand won
      const possibleWinMultiplier: number = checkHandForWins([...this.cards]);
      if (possibleWinMultiplier) {
        this.player.payWinning(possibleWinMultiplier);
        // console.log('bet: ' + this.bet + '. Multiplier: ' + possibleWinMultiplier + '. WINNING: ' + this.bet * possibleWinMultiplier);
        console.log(this.player);
      }
      this.deck = new Deck();
      this.isGameOn = false;
      // console.log(this.player);
    },
    dealNewCards() {
      cardDealSound.play();
      if (this.bet > this.player.money) {
        this.showAndHideSnackbar();
        return;
      }
      this.isGameOn = true;
      this.player.currentBet = parseInt(this.bet);
      this.cards = this.deck.take5CardsFromDeck();
    },
    showAndHideSnackbar() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
    }
  },
  created() {
    this.audio = this.$refs.audio;
    this.cards = this.deck.getCardBack(5);
    this.player = createMockPlayer();
    this.loading = false;
  }
});
</script>

<style scoped>
.dealBtn {
  width: 10%;
}
.lockedBtn {
  background-color: rgb(0, 110, 255) !important;
}
.betInput {
  max-width: 10%;
}
</style>

