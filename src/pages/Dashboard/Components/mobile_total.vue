 <template>
  <div>
    <md-content>
      <!-- <div class="phone-viewport"> -->
      <v-bottom-nav fixed app mandatory :value="getShowTotals" color="white">
        <div class="md-layout">
          <div class="md-layout-item md-size-33">
            <center>
              <span>
                <b>Subtotal</b>
              </span>
              <p style="width: 80%; font-size: 90%; margin-top: 5%;">{{TOTAL.net | currency}}</p>
            </center>
          </div>
          <div class="md-layout-item md-size-33">
            <center>
              <span>
                <b>Impuesto</b>
              </span>
              <p style="width: 80%; font-size: 90%; margin-top: 5%;">{{(TOTAL.tax) | currency}}</p>
            </center>
          </div>
          <div class="md-layout-item md-size-33">
            <center>
              <span>
                <b>Total</b>
              </span>
              <p style="width: 80%; font-size: 90%; margin-top: 5%;">{{TOTAL.total | currency}}</p>
            </center>
          </div>
        </div>
      </v-bottom-nav>
      <!-- </div> -->
    </md-content>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  props: {
    totals: {}
  },

  data() {
    return {
      show: true
    };
  },
  methods: {},

  computed: {
    ...mapGetters({
      getIncome: 'incomes/getIncome',
      getShowTotals: 'getShowTotals'
    }),

    TOTAL() {
      let total = _.sumBy(this.getIncome.lines, function(line) {
        return line.price * line.quantity;
      });

      return {
        net: total,
        tax: total * 0.19,
        total: total * 0.19 + total
      };
    }
  }
};
</script>
<style>
</style>
