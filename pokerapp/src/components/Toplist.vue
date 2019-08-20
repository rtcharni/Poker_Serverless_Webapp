<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Show Toplist</v-btn>
      </template>

      <div v-if="loading" class="progressDiv">
        <v-progress-linear class="progressBar" indeterminate color="cyan" height="10"></v-progress-linear>
      </div>

      <v-tabs v-if="!loading" fixed-tabs>
        <v-tab>Money record</v-tab>
        <v-tab-item>
          <v-card>
            <v-list dense rounded dark>
              <v-list-tile v-for="(item, index) in moneyRecords" :key="index">
                <img
                  v-if="index < 3"
                  class="iconLeft"
                  v-bind:src="require(`../assets/${index}.png`)"
                />
                <img
                  v-if="index === 0"
                  class="iconRight"
                  v-bind:src="require(`../assets/crown.png`)"
                />
                <v-list-tile-content class="align-center">{{item.name}}</v-list-tile-content>
                <v-list-tile-content class="align-center">{{item.value}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab>Most money</v-tab>
        <v-tab-item>
          <v-card>
            <v-list dense rounded dark>
              <v-list-tile v-for="(item, index) in money" :key="index">
                <img
                  v-if="index < 3"
                  class="iconLeft"
                  v-bind:src="require(`../assets/${index}.png`)"
                />
                <img
                  v-if="index === 0"
                  class="iconRight"
                  v-bind:src="require(`../assets/crown.png`)"
                />
                <v-list-tile-content class="align-center">{{item.name}}</v-list-tile-content>
                <v-list-tile-content class="align-center">{{item.value}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab>Most wins</v-tab>
        <v-tab-item>
          <v-card>
            <v-list dense rounded dark>
              <v-list-tile v-for="(item, index) in wins" :key="index">
                <img
                  v-if="index < 3"
                  class="iconLeft"
                  v-bind:src="require(`../assets/${index}.png`)"
                />
                <img
                  v-if="index === 0"
                  class="iconRight"
                  v-bind:src="require(`../assets/crown.png`)"
                />
                <v-list-tile-content class="align-center">{{item.name}}</v-list-tile-content>
                <v-list-tile-content class="align-center">{{item.value}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab>Biggest win</v-tab>
        <v-tab-item>
          <v-card>
            <v-list dense rounded dark>
              <v-list-tile v-for="(item, index) in biggestWins" :key="index">
                <img
                  v-if="index < 3"
                  class="iconLeft"
                  v-bind:src="require(`../assets/${index}.png`)"
                />
                <img
                  v-if="index === 0"
                  class="iconRight"
                  v-bind:src="require(`../assets/crown.png`)"
                />
                <v-list-tile-content class="align-center">{{item.name}}</v-list-tile-content>
                <v-list-tile-content class="align-center">{{item.value}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
        <!-- <v-btn class="" color="primary" @click="dialog = false">Close</v-btn> -->
      </v-tabs>
      <!-- <v-spacer></v-spacer> -->
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getToplist } from "../utils/apiRequests";
import { Toplist } from "../../../serverless/functions/src/models/toplist";

export default Vue.extend({
  name: "toplist",
  components: {},
  props: {},
  data: () => ({
    dialog: false,
    loading: true,
    toplist: Object() as Toplist,
    wins: [],
    money: [],
    biggestWins: [],
    moneyRecords: []
  }),
  methods: {
    clearCacheArrays() {
      this.wins = [];
      this.money = [];
      this.biggestWins = [];
      this.moneyRecords = [];
    },
    sortCacheArrays() {
      this.wins = this.wins.sort((a, b) => (a.value < b.value ? 1 : -1));
      this.money = this.money.sort((a, b) => (a.value < b.value ? 1 : -1));
      this.biggestWins = this.biggestWins.sort((a, b) =>
        a.value < b.value ? 1 : -1
      );
      this.moneyRecords = this.moneyRecords.sort((a, b) =>
        a.value < b.value ? 1 : -1
      );
    }
  },
  watch: {
    dialog: async function(newValue, oldValue) {
      if (newValue) {
        // Add && !Object.keys(this.toplist).length, then caches toplist and not fetches every time.
        const response: any = await getToplist();
        if (response.success) {
          this.loading = false;
          this.clearCacheArrays();
          this.toplist = response.toplist;
          Object.entries(response.toplist).forEach(([username, stats]) => {
            Object.entries(stats).forEach(([key, value]) => {
              switch (key) {
                case "biggest_win":
                  this.biggestWins.push({ name: username, value: value });
                  break;
                case "money":
                  this.money.push({ name: username, value: value });
                  break;
                case "wins":
                  this.wins.push({ name: username, value: value });
                  break;
                case "money_record":
                  this.moneyRecords.push({ name: username, value: value });
                  break;
              }
            });
          });
          this.sortCacheArrays();
        }
      }
    }
  }
});
</script>

<style>
button.v-btn.theme--dark.red.lighten-2 {
  background-color: #006761 !important;
  border-color: #006761 !important;
}
div.v-list__tile__content.align-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}
.theme--light.v-tabs__bar {
  background-color: #297a0be3 !important;
}
.theme--dark.v-list {
  background: #113200 !important;
  color: #fff !important;
}
.iconLeft {
  margin-left: 15%;
  position: absolute;
}
.iconRight {
  margin-left: 11%;
  position: absolute;
}
</style>
<style scoped>
.spinner {
  position: absolute;
}
.progressDiv {
  display: flex;
  justify-content: center;
}
.progressBar {
  width: 80%;
  border-radius: 20%;
}
</style>


