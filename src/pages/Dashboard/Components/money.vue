<template>
  <div>
    <money v-model="price" :name="field" v-bind="money" @input.native="update($event.target)"></money>
  </div>
</template>

<script>
import { Money } from 'v-money';

export default {
  components: { Money },
  props: {
    number: 0,
    field: ''
  },
  data() {
    return {
      price: 0,
      isSale: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        suffix: ' CLP',
        precision: 0,
        masked: true
      }
    };
  },
  mounted() {
    this.price = this.number;
  },

  methods: {
    trasnform(n) {
      let res = n.match(/\d/g).join('');
      let number = parseInt(res);

      return number;
    },
    update(event) {
      let res = {
        name: event.name,
        value: this.trasnform(event.value)
      };

      this.$emit('updateFunc', res);
    }
  }
};
</script>