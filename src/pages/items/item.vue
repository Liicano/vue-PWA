<template>
  <div id="textField">
    <div v-if="loading">
      <center>
        <spinner v-if="loading"/>
      </center>
    </div>

    <div v-else class="md-layout md-gutter md-alignment-center-center" style="margin:0">
      <div class="md-layout-item md-size-40 md-small-size-100" style="padding:0">
        <center>
          <v-card>
            <v-img :src="require('../../assets/img/item_header.jpg')" aspect-ratio="2.75">
              <v-layout column fill-height>
                <v-card-title>
                  <v-spacer></v-spacer>

                  <v-btn dark icon>
                    <v-icon>create</v-icon>
                  </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>
              </v-layout>
            </v-img>
            <v-card-title primary-title>
              <div>
                <v-subheader>Item</v-subheader>

                <div class="md-layout">
                  <div class="md-layout-item md-size-100">
                    <v-text-field
                      label="Nombre del item"
                      name="name"
                      autofocus
                      @input.native="updateItem($event.target)"
                      :value="ITEM.name"
                      color="green"
                      single-line
                      outline
                      append-icon="add_shopping_cart"
                    ></v-text-field>
                  </div>
                </div>

                <div class="md-layout">
                  <div class="md-layout-item md-size-100">
                    <v-text-field
                      name="price"
                      @input.native="updateItem($event.target)"
                      :value="ITEM.price"
                      label="Precio"
                      color="green"
                      single-line
                      type="number"
                      outline
                      append-icon="monetization_on"
                    ></v-text-field>
                  </div>
                  <!-- <div class="md-layout-item md-size-40">
                    <v-text-field
                      name="quantity"
                      @input.native="updateItem($event.target)"
                      :value="ITEM.quantity"
                      type="number"
                      label="Cantidad"
                      color="green"
                      single-line
                      outline
                    ></v-text-field>
                  </div>-->
                </div>

                <div class="md-layout">
                  <div class="md-layout-item md-size-100">
                    <v-select
                      append-icon="assessment"
                      color="green"
                      name="tax"
                      @change="handleSelect($event)"
                      small-chips
                      return-object
                      :value="ITEM.tax"
                      deletable-chips
                      :items="getTaxes.docs"
                      :item-text="'name'"
                      item-value="number"
                      chips
                      label="Impuesto"
                      multiple
                      outline
                    ></v-select>
                  </div>
                </div>

                <v-subheader>Estimado</v-subheader>

                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <center>
                      <v-btn
                        flat
                        icon
                        :color="(ITEM.estimate.buy.lock) ? 'red' : 'green'"
                        @click="handleLock('buy')"
                      >
                        <v-icon>{{(ITEM.estimate.buy.lock) ? 'lock' : 'lock_open'}}</v-icon>
                      </v-btn>
                    </center>
                    <v-spacer></v-spacer>
                    <v-text-field
                      type="number"
                      name="estimate"
                      @input.native="updateItem($event.target, 'buy', 'price')"
                      :value="ITEM.estimate.buy.price"
                      label="Compra"
                      color="green"
                      single-line
                      outline
                    ></v-text-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <center>
                      <v-btn
                        flat
                        icon
                        :color="(ITEM.estimate.sell.lock) ? 'red' : 'green'"
                        @click="handleLock('sell')"
                      >
                        <v-icon>{{(ITEM.estimate.sell.lock) ? 'lock' : 'lock_open'}}</v-icon>
                      </v-btn>
                    </center>
                    <v-text-field
                      name="estimate"
                      @input.native="updateItem($event.target, 'sell', 'price')"
                      :value="ITEM.estimate.sell.price"
                      type="number"
                      label="Venta"
                      color="green"
                      single-line
                      outline
                    ></v-text-field>
                  </div>
                </div>

                <v-subheader>Margen</v-subheader>

                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <v-subheader>Maximo +</v-subheader>
                    <center>
                      <v-radio-group
                        row
                        class="align-center justify-center"
                        v-model="marginMax"
                        :mandatory="false"
                        @change="handleChange($event, 'max')"
                      >
                        <v-radio color="green" label="$" name="marginMax" value="price"></v-radio>
                        <v-radio label="%" color="green" name="marginMax" value="percentage"></v-radio>
                      </v-radio-group>
                    </center>

                    <v-text-field
                      name="margin"
                      @input.native="updateItem($event.target, 'max', 'marginMax')"
                      :value="(ITEM.margin.max.price != 0)?ITEM.margin.max.price:ITEM.margin.max.percentage"
                      type="number"
                      label
                      color="green"
                      single-line
                      outline
                      append-icon="arrow_upward"
                    ></v-text-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <v-subheader>Minimo -</v-subheader>
                    <center>
                      <v-radio-group
                        row
                        class="align-center justify-center"
                        v-model="marginMin"
                        :mandatory="false"
                        @change="handleChange($event, 'min')"
                      >
                        <v-radio color="green" label="$" name="marginMin" value="price"></v-radio>
                        <v-radio name="marginMin" color="green" label="%" value="percentage"></v-radio>
                      </v-radio-group>
                    </center>
                    <v-text-field
                      class="readonly"
                      name="margin"
                      @input.native="updateItem($event.target, 'min', 'marginMin')"
                      :value="(ITEM.margin.min.price != 0) ? ITEM.margin.min.price : ITEM.margin.min.percentage"
                      type="number"
                      label
                      color="green"
                      single-line
                      outline
                      append-icon="arrow_downward"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </center>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import isMobile from '../../assets/js/isMobile.js';
import store from '../../store/store.js';
import spinner from '../Dashboard/Components/spinner';

export default {
  props: {
    propID: null
  },
  data() {
    return {
      marginMin: 'price',
      marginMax: 'price',
      loading: true
    };
  },
  components: {
    spinner
  },

  created() {},
  mounted() {
    this.getAllTaxes();
    if (this.$route.params.id) {
      let params = this.propID != null ? this.propID : this.$route.params.id;

      this.getOneItem(params).then(res => {
        this.loading = false;
        this.marginMin =
          this.getItem.margin.min.percentage != 0 ? 'percentage' : 'price';
        this.marginMax =
          this.getItem.margin.max.percentage != 0 ? 'percentage' : 'price';
      });
    } else {
      this.loading = false;
    }

    this.cleanItem();
  },
  methods: {
    ...mapActions({
      getAllTaxes: 'tax/getAllTaxes',
      getOneItem: 'items/findItem'
    }),
    ...mapMutations({
      setItem: 'items/SET_ITEM',
      handleSelectInput: 'items/HANDLE_SELECT_INPUT',
      cleanItem: 'items/CLEAN'
    }),
    updateItem(event, name2, name3) {
      name3 = event.name == 'margin' ? this[name3] : name3;
      let obj = {
        attr: event.name,
        attr2: name2,
        attr3: name3,
        value: event.value
      };
      this.setItem(obj);
    },
    handleSelect(event) {
      this.handleSelectInput(event);
    },
    handleLock(type) {
      let state = this.getItem.estimate[type].lock;
      state = !state;
      this.setItem({
        attr: 'estimate',
        attr2: type,
        attr3: 'lock',
        value: state
      });
    },
    handleChange(event, type) {
      let options = ['price', 'percentage'];
      for (let option of options) {
        let obj = {
          attr: 'margin',
          attr2: type,
          attr3: option,
          value: 0
        };
        this.setItem(obj);
      }
    }
  },
  computed: {
    ...mapGetters({
      getItem: 'items/getItem',
      getTaxes: 'tax/getTaxes'
    }),
    ITEM() {
      return {
        name: this.getItem.name,
        tax: this.getItem.tax,
        quantity: this.getItem.quantity,
        estimate: {
          buy: {
            lock: this.getItem.estimate.buy.lock,
            price: this.getItem.estimate.buy.price
          },
          sell: {
            lock: this.getItem.estimate.sell.lock,
            price: this.getItem.estimate.sell.price
          }
        },
        margin: {
          max: {
            percentage: this.getItem.margin.max.percentage,
            price: this.getItem.margin.max.price
          },
          min: {
            percentage: this.getItem.margin.min.percentage,
            price: this.getItem.margin.min.price
          }
        },
        price: this.getItem.price
      };
    }
  },

  watch: {
    getItem: {
      handler(val) {
        console.log(val);
      },
      deep: true
    }
  },

  // NAVIGATIONS GUARDS
  beforeRouteEnter: (to, from, next) => {
    store.commit('HIDE_SHOW_BOTTOM', false);
    next();
  },

  beforeRouteLeave(to, from, next) {
    store.commit('HIDE_SHOW_BOTTOM', true);
    next();
  }
};
</script>
<style>
#textField /deep/ input {
  background-color: transparent;
  border: none;
  border-bottom: none;
  border-radius: 0;
  outline: none;
  height: 100%;
  width: 100%;
  font-size: 16px;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: none;
  transition: none;
  transition: none;
  transition: none;
  max-height: none !important;
}
</style>
