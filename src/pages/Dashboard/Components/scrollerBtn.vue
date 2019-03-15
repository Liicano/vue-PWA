<template>
  <v-container>
    <v-btn
      color="green"
      dark
      absolute
      bottom
      right
      fab
      @click="$vuetify.goTo(target, options)"
      style="z-index: 100"
    >
      <v-icon>expand_less</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import * as easings from 'vuetify/es5/util/easing-patterns';

export default {
  data() {
    return {
      type: 'number',
      number: 1,
      selector: '#first',
      selected: 'Button',
      elements: ['Button', 'Radio group'],
      duration: 300,
      offset: -50,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings)
    };
  },
  computed: {
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    },
    element() {
      if (this.selected === 'Button') return this.$refs.button;
      else if (this.selected === 'Radio group') return this.$refs.radio;
    }
  }
};
</script>