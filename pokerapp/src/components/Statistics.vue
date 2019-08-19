<template>
  <div>
     <v-card>
            <v-card-title><h4>Your Stats</h4></v-card-title>
            <!-- <v-divider></v-divider> -->
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
  },
  data: () => ({
  }),
  methods: {
  }
});
</script>

<style scoped>
.v-list {
  background: #feffffb8;
}
.v-card {
  background: #3aca7582;
}
div.v-list__tile__content.align-end {
  -webkit-box-align: end !important;
  -ms-flex-align: end !important;
  align-items: flex-end !important;
}
</style>

