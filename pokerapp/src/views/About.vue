<template>
  <div>
    <Navbar></Navbar>
    <v-img
      v-bind:src="require('../assets/playing-cards_free_background_image_2210x1473.jpg')"
      :max-height="height"
    >
      <v-layout align-center column justify-center>
        <v-card max-width="750" class="mx-auto aboutCard" raised elevation="20">
          <v-card-title>
            <h4>Hello there and Welcome to the Online - Poker game !</h4>
          </v-card-title>
          <v-card-text>
            <h5>
            This application is a simple online poker game for playing totally for free!
            The information about every user that we save is only given username and password (encrypted).
            Your statistics are saved also so don't forget your creadentials for playing later.
            </h5>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="red" link href="https://github.com/rtcharni/Poker_Serverless_Webapp" target="_blank">
              <img class="githubIcon" v-bind:src="require(`../assets/github.png`)" />
              See on Github
            </v-btn>
            <v-btn text color="black" link to="/login">
              Lets Play!
              <img class="cardsIcon" v-bind:src="require(`../assets/cards.png`)" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "../components/Navbar.vue";
export default Vue.extend({
  name: "about",
  components: {
    Navbar
  },
  data: () => ({ height: "700" }),
  methods: {},
  mounted() {
    if (this.$parent.$el.clientHeight) {
      this.height = this.$parent.$el.clientHeight * 0.9;
    }
  }
});
</script>

<style scoped>
a.v-btn.theme--light.red {
  background-color: #dd2229 !important;
  border-color: #dd2229 !important;
  color: #ffffff !important;
}
a.v-btn.theme--light.black {
  background-color: #271e1a !important;
  border-color: #271e1a !important;
  color: #ffffff !important;
}
.githubIcon {
  padding-right: 12px;
}
.cardsIcon {
  padding-left: 12px;
}
.aboutCard {
  margin-top: 20px;
}
.v-card__actions > *,
.v-card__actions .v-btn {
  margin: 8px;
}
</style>
