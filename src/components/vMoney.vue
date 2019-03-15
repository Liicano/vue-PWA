<template>
  <div>
     <md-field>
         <input v-model.number.lazy="valor" v-money="money" class="form-input" />
     </md-field>
  </div>
</template>

<script>
import { Money } from "v-money";

export default {
  props: ["amount"],

  components: { Money },

  data() {
    return {
      valor: this.amount,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "$ ",
        suffix: " CLP",
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    };
  }
};
</script>