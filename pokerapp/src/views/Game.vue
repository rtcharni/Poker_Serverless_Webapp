<template>
  <v-img v-bind:src="require('../assets/greenbackground.png')" max-height="1000">
    <v-btn @click="logout" class="logoutBtn" fab dark color="teal">
      <v-icon dark>logout</v-icon>
    </v-btn>
    <div class="container">
      <div v-if="!loading" style="display: flex" class="row">
        <v-img
          class="card mr-5 animated faster card1"
          v-bind:src="cards[0].img"
          height="auto"
          width="auto"
        ></v-img>
        <v-img
          class="card mr-5 animated faster card2"
          v-bind:src="cards[1].img"
          height="auto"
          width="auto"
        ></v-img>
        <v-img
          class="card mr-5 animated faster card3"
          v-bind:src="cards[2].img"
          height="auto"
          width="auto"
        ></v-img>
        <v-img
          class="card mr-5 animated faster card4"
          v-bind:src="cards[3].img"
          height="auto"
          width="auto"
        ></v-img>
        <v-img
          class="card animated faster card5"
          v-bind:src="cards[4].img"
          height="auto"
          width="auto"
        ></v-img>
      </div>
      <div class="row" style="display: flex; flex-direction: row; justify-content: space-around;">
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(0) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="0"
          class="mr-5"
        >{{lockedCards.indexOf(0) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(1) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="1"
          class="mr-5"
        >{{lockedCards.indexOf(1) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(2) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="2"
          class="mr-5"
        >{{lockedCards.indexOf(2) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(3) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="3"
          class="mr-5"
        >{{lockedCards.indexOf(3) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
        <v-btn
          v-bind:class="{lockedBtn: lockedCards.indexOf(4) !== -1}"
          @click="lockCard"
          round
          outline
          color="indigo"
          value="4"
        >{{lockedCards.indexOf(4) !== -1 ? 'Locked' : 'Lock'}}</v-btn>
      </div>

      <div
        v-if="!loading"
        class="row container"
        style="display: flex; justify-content: space-between;"
      >
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
          :disabled="dealBtnDisabled"
          @click="isGameOn ? dealChangeCards() : dealNewCards()"
          color="indigo"
          class="dealBtn"
          outlined
        >{{isGameOn ? 'Change cards' : 'Deal'}}</v-btn>
        <Toplist />
        <v-icon class="soundBtn" large @click="changeSound">{{sound ? 'volume_off' : 'volume_up'}}</v-icon>
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
        v-bind:text="snackbarText"
        v-bind:color="snackbarColor"
      />
    </div>
  </v-img>
</template>

<script lang="ts">
import Vue from "vue";
import { Deck } from "../gameplay/Deck";
import { checkHandForWins } from "../gameplay/Winning";
import { Card } from "../models/interfaces";
import {
  Player,
  createMockPlayer,
  createPlayerFromUser
} from "../gameplay/Player";
import Snackbar from "../components/Snackbar.vue";
import Statistics from "../components/Statistics.vue";
import WinningTable from "../components/WinningTable.vue";
import Toplist from "../components/Toplist.vue";

import { cardDealSound, winSound, soundsOff, soundsOn } from "../utils/utils";
import { updateUser } from "../utils/apiRequests";

export default Vue.extend({
  name: "game",
  components: { Snackbar, Statistics, WinningTable, Toplist },
  data: () => ({
    auth: "",
    snackbarText: "",
    snackbarColor: "",
    snackbar: false,
    audio: Object,
    bet: "0",
    dealBtn: {
      text: "Deal"
    },
    loading: true,
    isGameOn: false,
    dealBtnDisabled: false,
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
    async dealChangeCards() {
      this.dealBtnDisabled = true;
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
      const possibleWinMultiplier: number = checkHandForWins([...this.cards]);

      // Hand won
      if (possibleWinMultiplier) {
        winSound.play();
        const totalWin: number = this.player.currentBet * possibleWinMultiplier;
        this.player.statistics.biggest_win =
          totalWin > this.player.statistics.biggest_win
            ? totalWin
            : this.player.statistics.biggest_win;

        this.player.payWinning(possibleWinMultiplier);
        this.player.statistics.wins++;
        this.player.statistics.total_games++;
      } else {
        // Hand lost
        this.player.statistics.loses++;
        this.player.statistics.total_games++;
      }

      if (this.player.money > this.player.statistics.money_record) {
        this.player.statistics.money_record = this.player.money;
      }

      console.log(this.player);
      const response = await updateUser(this.player, this.auth, this.$router);
      // Show some message or something.
      this.auth = response.auth;
      this.deck = new Deck();
      this.dealBtnDisabled = false;
      this.isGameOn = false;
    },
    dealNewCards() {
      if (this.bet > this.player.money) {
        this.showAndHideSnackbar("No enough money...", "info", 3000);
        return;
      }
      cardDealSound.play();
      this.isGameOn = true;
      this.player.currentBet = parseInt(this.bet);
      this.cards = this.deck.take5CardsFromDeck();
      this.animateAllCards();
    },
    showAndHideSnackbar(message: string, color: string, duration: number) {
      this.snackbarText = message;
      this.snackbarColor = color;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, duration);
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
    },
    logout() {
      this.$router.replace({
        name: "login",
        params: { loggedIn: "false" }
      });
    }
  },
  created() {
    this.cards = this.deck.getCardBack(5);
    // this.player = createMockPlayer();
    if (this.$route.params.user) {
      this.player = createPlayerFromUser(this.$route.params.user);
    }
    this.auth = this.$route.params.auth;
    console.log(this.player);
    this.loading = false;
  },
  mounted() {
    this.activateAnimationEndListeners();
    console.log(this);
    // console.log(this.$route.params)
  }
});
</script>

<style scoped>
.dealBtn {
  width: 13%;
  /* margin-right: calc(100% - 3em); */
  margin-right: 55%;
}
.lockedBtn {
  background-color: rgba(161, 192, 202, 0.7) !important;
}
.soundBtn {
  margin-bottom: 27px;
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
.logoutBtn {
  float: right;
  margin-right: 3%;
  margin-top: 1.5%;
}
.v-btn.v-btn--outline {
  border: 3px solid currentColor;
}
</style>

