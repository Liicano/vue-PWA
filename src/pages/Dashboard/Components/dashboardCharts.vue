<template>
  <div v-if="type == 'no_labels'">
    <v-card class="mx-auto" color="grey lighten-4" max-width="400">
      <v-card-title>
        <!-- <v-icon
          :color="checking ? 'red lighten-2' : 'green'"
          class="mr-5"
          size="64"
          @click="takePulse"
        >monetization_on</v-icon>-->
        <v-layout column align-start>
          <div class="caption grey--text text-uppercase">Gastos del mes</div>
          <div>
            <span class="display-1 font-weight-black" v-text="'$ 370.000 CLP'"></span>
            <strong v-if="avg">BPM</strong>
          </div>
        </v-layout>
      </v-card-title>

      <v-sheet color="transparent">
        <v-sparkline
          :smooth="16"
          :gradient="['#f72047', '#ffd200', '#1feaea']"
          :line-width="3"
          :key="String(avg)"
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
    </v-card>
  </div>

  <div v-else-if="type == 'labels'">
    <v-card class="mt-3 mx-auto" max-width="400">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2"></div>
        <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small>mdi-clock</v-icon>
        <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const exhale = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  props: {
    type: null
  },
  data: () => ({
    checking: false,
    heartbeats: [],
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0);
      const length = this.heartbeats.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    }
  },

  created() {
    this.takePulse(false);
  },

  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    async takePulse(inhale = true) {
      this.checking = true;

      inhale && (await exhale(1000));

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat);

      this.checking = false;
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>