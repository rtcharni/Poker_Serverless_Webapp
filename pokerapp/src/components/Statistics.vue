<template>
  <div>
     <v-card>
            <v-card-title><h4>Your Stats</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Money:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.money}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Wins:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.statistics.wins}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Loses:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.statistics.loses}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Biggest win:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.statistics.biggest_win}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Money record:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.statistics.money_record}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total games:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{player.statistics.total_games}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from '../../../serverless/functions/src/models/user';
import { Player } from '../gameplay/Player';

export default Vue.extend({
  name: "statistics",
  components: {},
  props: {
    player: Player,
    //   user: Object as User,
    // username: String,
    // money: Number,
    // wins: Number,
    // loses: Number,
    // biggestWin: Number,
    // moneyRecord: Number,
    // totalGames: Number,
  },
  data: () => ({
  }),
  methods: {
  }
});
</script>

<style scoped>
</style>

