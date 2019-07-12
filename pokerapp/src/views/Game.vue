<template>
  <div class="container">
    <!-- <v-container> -->
    <!-- <v-layout row> -->
    <div v-if="!loading" class="row">
      <div class="col">
        <v-img
          class="card animated faster card1"
          v-bind:src="cards[0].img"
          height="auto"
          width="150"
        ></v-img>
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
        <v-img
          class="card animated faster card2"
          v-bind:src="cards[1].img"
          height="auto"
          width="150"
        ></v-img>
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
        <v-img
          class="card animated faster card3"
          v-bind:src="cards[2].img"
          height="auto"
          width="150"
        ></v-img>
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
        <v-img
          class="card animated faster card4"
          v-bind:src="cards[3].img"
          height="auto"
          width="150"
        ></v-img>
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
        <v-img
          class="card animated faster card5"
          v-bind:src="cards[4].img"
          height="auto"
          width="150"
        ></v-img>
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
    <div class="row container">
      <v-text-field
        :disabled="isGameOn"
        v-model="bet"
        class="betInput"
        prefix="$"
        type="number"
        label="Place bet"
        solo
      ></v-text-field>
      <v-btn
        @click="isGameOn ? dealChangeCards() : dealNewCards()"
        color="indigo"
        class="dealBtn"
      >{{isGameOn ? 'Change cards' : 'Deal'}}</v-btn>
      <v-icon large @click="changeSound">{{sound ? 'volume_off' : 'volume_up'}}</v-icon>
    </div>

    <v-layout class="stats-wins">
      <v-flex>
        <Statistics v-bind:player="player" class="stats" />
      </v-flex>
      <v-flex>
        <WinningTable v-bind:bet="bet" class="wins" />
      </v-flex>
    </v-layout>
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
import { checkHandForWins } from "../gameplay/Winning";
import { Card } from "../models/interfaces";
import { Player, createMockPlayer } from "../gameplay/Player";
import Snackbar from "../components/Snackbar.vue";
import Statistics from "../components/Statistics.vue";
import WinningTable from "../components/WinningTable.vue";
import { cardDealSound, winSound, soundsOff, soundsOn } from "../utils/utils";

export default Vue.extend({
  name: "game",
  components: { Snackbar, Statistics, WinningTable },
  data: () => ({
    audio: Object,
    snackbar: false,
    bet: 0,
    dealBtn: {
      text: "Deal"
    },
    loading: true,
    isGameOn: false,
    sound: true,
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
      cardDealSound.play();

      this.cards = this.cards.map((card, i) => {
        let changeCardNumber = 1;
        if (this.lockedCards.indexOf(i) === -1) {
          document
            .querySelector(`.card${i + 1}`)
            .classList.add("fadeInRightBig", `card${changeCardNumber}-anim`);
          changeCardNumber++;
          return this.deck.takeCardFromDeck();
        } else {
          return card;
        }
      });
      this.lockedCards = [];
      // Hand won
      const possibleWinMultiplier: number = checkHandForWins([...this.cards]);
      if (possibleWinMultiplier) {
        winSound.play();
        this.player.payWinning(possibleWinMultiplier);
        console.log(this.player);
      }
      this.deck = new Deck();
      this.isGameOn = false;
      // console.log(this.player);
    },
    dealNewCards() {
      if (this.bet > this.player.money) {
        this.showAndHideSnackbar();
        return;
      }
      cardDealSound.play();
      this.isGameOn = true;
      this.player.currentBet = parseInt(this.bet);
      this.cards = this.deck.take5CardsFromDeck();
      this.animateAllCards();
    },
    showAndHideSnackbar() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
    },
    changeSound() {
      this.sound ? soundsOff() : soundsOn();
      this.sound = !this.sound;
    },
    activateAnimationEndListeners() {
      for (let i = 1; i <= 5; i++) {
        document
          .querySelector(`.card${i}`)
          .addEventListener("animationend", function() {
            document
              .querySelector(`.card${i}`)
              .classList.remove(`card${i}-anim`, `fadeInRightBig`);
          });
      }
    },
    animateAllCards() {
      for (let i = 1; i <= 5; i++) {
        document
          .querySelector(`.card${i}`)
          .classList.add(`fadeInRightBig`, `card${i}-anim`);
      }
    }
  },
  created() {
    this.cards = this.deck.getCardBack(5);
    this.player = createMockPlayer();
    this.loading = false;
  },
  mounted() {
    this.activateAnimationEndListeners();
  }
});
</script>

<style scoped>
.dealBtn {
  width: 10%;
}
.lockedBtn {
  background-color: rgb(0, 195, 255) !important;
}
.betInput {
  max-width: 10%;
}
.stats {
  margin-right: 10px;
}
.wins {
  margin-left: 10px;
}
.card1-anim {
  animation-delay: 0s;
}
.card2-anim {
  animation-delay: 0.15s;
}
.card3-anim {
  animation-delay: 0.3s;
}
.card4-anim {
  animation-delay: 0.45s;
}
.card5-anim {
  animation-delay: 0.6s;
}
</style>

