<template>
  <div>
    <md-content>
      <div class="md-layout">
        <div class="md-layout-item md-size-100" style="padding:0">
          <md-toolbar
            class="md-success"
            style="padding-top: 5%;padding-bottom: 0px;"
            v-if="isMobile"
          >
            <div class="md-toolbar-row" id="textField">
              <md-button
                v-if="isMobile"
                class="md-just-icon md-simple md-white"
                style="padding-right: 25px;margin-top: -5%;"
                @click="closeItemDialog()"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>

              <autocomplete
                style="width: 100%;"
                @clickOnItem="updateItem"
                @optionalInputFunction="updateItem"
                :config="acomplete"
              ></autocomplete>

              <center>
                <md-button
                  @click="createItem(getItem.name)"
                  class="md-just-icon md-simple md-white"
                  style="padding-left: 25px;margin-top: -40%;"
                >
                  <md-icon>{{(getItem.name != '') ? 'add' : ''}}</md-icon>
                </md-button>
              </center>
            </div>
          </md-toolbar>

          <div v-else style="display:contents;" id="textField">
            <div class="md-layout">
              <div class="md-layout-item md-size-80">
                <autocomplete
                  style="width: 100%;"
                  @clickOnItem="updateItem"
                  @optionalInputFunction="updateItem"
                  :config="acomplete"
                ></autocomplete>
              </div>
              <div class="md-layout-item md-size-20">
                <md-button @click="createItem(getItem.name)" class="md-just-icon md-success">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </div>
          </div>
          <v-subheader v-if="!isMobile">Ultimos utilizados</v-subheader>
          <v-divider v-if="!isMobile"></v-divider>
        </div>

        <div class="md-layout-item md-size-100" style="padding:0">
          <v-list>
            <div style="display:contents" v-if="getUserLastItems.length > 0 && isMobile">
              <v-list-tile
                v-for="(item, index) in getUserLastItems"
                :key="item.title"
                avatar
                v-ripple
              >
                <div style="display: contents;">
                  <v-list-tile-content @click="handleItem(index)">
                    <v-list-tile-title style="color: #424242">{{item.name | capitalize}}</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <center>
                      <div class="md-layout">
                        <div :class="['md-layout-item md-size-100']" style="padding: 0">
                          <center @click="handleItem(index)">
                            <zoom-center-transition :duration="900">
                              <v-icon
                                v-if="getSelectedItemsAdd.indexOf(index) < 0"
                                color="green"
                              >add</v-icon>

                              <v-icon v-else color="green">check_circle</v-icon>
                            </zoom-center-transition>
                          </center>
                        </div>
                      </div>
                    </center>
                  </v-list-tile-action>
                </div>
              </v-list-tile>
            </div>

            <div style="display:contents" v-if="getUserLastItems.length > 0 && !isMobile">
              <div
                style="display:contents;"
                v-for="(item, index) in getUserLastItems"
                :key="item.title"
              >
                <v-chip
                  color="white"
                  style="box-shadow: 1px 1px grey;"
                  v-if="getSelectedItemsAdd.indexOf(index) < 0"
                  @click="handleItem(index)"
                >
                  <strong>{{item.name}}</strong>&nbsp;
                  <span>{{item.lastPrice | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</span>
                </v-chip>

                <v-chip v-else color="green" text-color="white" @click="handleItem(index)">
                  <v-avatar class="green darken-4">
                    <v-icon>check</v-icon>
                  </v-avatar>
                  <strong>{{item.name}}</strong>&nbsp;
                  <span>{{item.lastPrice | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</span>
                </v-chip>
              </div>
            </div>

            <div v-if="getUserLastItems.length <= 0">
              <md-empty-state
                class="md-success"
                md-icon="add_shopping_cart"
                md-label="Aun no tienes items"
                md-description="Crea un item colocando su nombre y presionando el simbolo de ( + ) de la barra de navegacion."
              ></md-empty-state>
            </div>
          </v-list>
        </div>

        <div class="md-layout-item md-size-100">
          <!-- <v-bottom-sheet inset hide-overlay persistent v-model="sheet">
            <v-card tile>
              <div class="md-layout">
                <div class="md-layout-item md-size-50"></div>
                <div class="md-layout-item md-size-50">
                  <v-btn
                      flat
                      icon
                      color="green darken-1"
                      class="pull-right"
                      @click="sheet = !sheet"
                    >
                      <v-icon>save</v-icon>
                  </v-btn>
                  <v-subheader v-if="!isMobile" class="pull-right green--text">AGREGAR LINEA +</v-subheader>
                </div>
              </div>

              <div class="md-layout">
                <div
                  class="md-layout-item md-size-100"
                  style="padding:0"
                  v-if="getSelectedItemsAdd.length == 1 || getItem.item"
                >
                  <center>
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100" style="padding:0">
                        <center>
                          <v-list>
                            <v-subheader v-if="getItem.item">{{getItem.name | uppercase}}</v-subheader>
                            <br>
                            <v-list-tile color="red">
                              <br>

                              <v-layout align-center justify-center row fill-height>
                                <v-flex xs6 @click="setPrice(PRICES.last)" style="cursor:pointer">
                                  <small class="body-1 grey--text">Ultima venta</small>
                                  <br>
                                  <p
                                    class="body-2 blue--text"
                                  >{{(PRICES.last) ? PRICES.last : 0 | currency}}</p>
                                </v-flex>

                                <v-flex xs6 @click="setPrice(PRICES.stock)" style="cursor:pointer">
                                  <small class="body-1 grey--text">En catalogo</small>
                                  <br>
                                  <p
                                    class="body-2 green--text"
                                  >{{(PRICES.stock) ? PRICES.stock : 0 | currency}}</p>
                                </v-flex>
                              </v-layout>
                            </v-list-tile>
                          </v-list>
                          <v-divider></v-divider>
                          <br>
                          <v-list>
                           
                            <v-list-tile>
                              <v-layout justify-center fill-height>
                                <v-flex xs6 id="textField">
                                  <v-text-field
                                    name="price"
                                    @input.native="updateItem($event.target)"
                                    type="number"
                                    label="Precio"
                                    solo
                                    v-model="priceSeted"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                  <v-layout>
                                    <v-flex xs4>
                                      <v-btn
                                        icon
                                        color="red white--text"
                                        @click="changeQuantity('remove')"
                                      >
                                        <v-icon>remove</v-icon>
                                      </v-btn>
                                    </v-flex>
                                    <v-flex xs4 id="textField">
                                      <v-text-field
                                        @input.native="updateItem($event.target)"
                                        name="quantity"
                                        type="number"
                                        label="#"
                                        min="0"
                                        v-model="localQuantity"
                                        solo
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                      <v-btn
                                        icon
                                        color="green white--text"
                                        @click="changeQuantity('add')"
                                      >
                                        <v-icon>add</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-list-tile>
                          </v-list>
                        </center>
                      </div>
                    </div>
                  </center>
                </div>
               
                <div class="md-layout-item md-size-100" v-else>
                  <br>
                  <v-layout>
                    <v-flex xs12 justify-center>
                      <v-list>
                        <v-list-tile>
                          <v-layout align-center justify-center row fill-height>
                            <v-flex xs4>
                              <v-btn
                                class="pull-right"
                                icon
                                color="red white--text"
                                @click="changeQuantity('remove')"
                              >
                                <v-icon>remove</v-icon>
                              </v-btn>
                            </v-flex>
                            <v-flex xs4 id="textField">
                              <v-text-field
                                @input.native="updateItem($event.target)"
                                name="quantity"
                                type="number"
                                label="#"
                                min="0"
                                v-model="localQuantity"
                                solo
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                              <v-btn icon color="green white--text" @click="changeQuantity('add')">
                                <v-icon>add</v-icon>
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </div>
                
              </div>
            </v-card>
          </v-bottom-sheet>-->
        </div>
      </div>
    </md-content>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import _ from 'lodash';

import autocomplete from '../../Dashboard/Components/autocomplete/autocomplete';
import money from '../../Dashboard/Components/money';
import api from '../../../lib/api';
import { ZoomCenterTransition, SlideXRightTransition } from 'vue2-transitions';

import isMobile from '../../../assets/js/isMobile.js';

export default {
  props: {
    item: {}
  },

  components: {
    money,
    autocomplete,
    ZoomCenterTransition
  },

  data() {
    return {
      sheet: false,
      value: '',
      test: true,
      bottomShett: false,
      comments: [],
      loading: false,
      isBlock: null,
      isMobile: null,
      localQuantity: 0,

      onSelect: false,
      selectedItems: [],
      selected: [],

      acomplete: {
        itemType: 'items',
        initialValue: '',
        principalAtribute: 'name',
        secondaryAtribute: '',
        optionalMultipleAtribute: '',
        secondaryQuery: null,
        placeholder_value: 'Buscar / Crear items...',
        searchRoute: '',
        res_name: 'item',
        optionalInputFunction_res: { 0: 'name' }
      },
      optIndex: '',
      priceSeted: ''
    };
  },

  created() {
    // AUTOCOMPLETE CONFIG
    this.acomplete.searchRoute = api + '/items/find/';

    let params = {
      parent: this.getItem._id,
      type: 'item'
    };

    this.loading = true;
    if (this.item._id) {
      this.getAllComments(params).then(res => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.isMobile = isMobile;
    this.acomplete.initialValue = this.getItem.name;
    this.getUserItems().then(res => {});
    this.localQuantity = !isNaN(this.getItem.quantity)
      ? this.getItem.quantity
      : parseInt(this.getItem.quantity);

    this.optIndex = 0;
  },

  methods: {
    // ACTIONS
    ...mapActions({
      postItem: 'items/postItem',
      getAllComments: 'comments/getAllComments',
      postComment: 'comments/postComment',
      getUserItems: 'items/getUserItems',
      findItem: 'items/findItem'
    }),
    ...mapMutations({
      setItem: 'items/SET_ITEM',
      setIncome: 'incomes/SET_INCOME',
      setComment: 'comments/SET_COMMENT',
      cleanItem: 'items/CLEAN',
      setGlobalsCreate: 'items/SET_GLOBALS_CREATE',
      handleItemDialog: 'HANDLE_ITEM_DIALOG',
      handleCheckbox: 'items/HANDLE_CHECKBOX',
      handleSelections: 'items/HANDLE_SELECTIONS'
    }),

    updateItem(event) {
      if (this.getSelectedItemsAdd.length > 0) {
        let obj = {
          attr: event.name,
          value: event.value
        };
        this.setGlobalsCreate(obj);
      } else {
        let obj = {
          attr: event.name,
          value: event.value
        };
        this.setItem(obj);

        if (event.name == 'item') {
          // this.sheet = true;
          this.$toasted.show('¡Seleccionaste ' + event.value.name, {
            type: 'success'
          });
        }
      }
    },
    closeItemDialog() {
      this.handleItemDialog(false);
    },

    createItem(term) {
      if (term != '') {
        let obj = {
          name: term
        };
        this.postItem(obj).then(res => {
          this.$toasted.show('¡Item creado con exito!', {
            type: 'success'
          });
          // this.sheet = true;
        });
      } else {
        this.$toasted.show('Debe escribir nombre del item!', {
          type: 'warning'
        });
      }
    },

    updateComment(event) {
      this.setComment(event);
    },
    newComment() {
      let params = {
        parent: this.getItem._id,
        type: 'item',
        txt: this.COMMENT
      };
      this.postComment(params).then(res => {});
    },
    handleItem(index) {
      this.optIndex = index;
      this.handleSelections({ var: 'selectedItemsAdd', index: index });
    },

    changeQuantity(type) {
      if (this.localQuantity >= 0) {
        type == 'add'
          ? (this.localQuantity = this.localQuantity + 1)
          : (this.localQuantity = this.localQuantity - 1);
      } else {
        this.localQuantity = 0;
      }
    },
    setPrice(price) {
      price == undefined ? '' : price;
      console.log(price);
      this.updateItem({ name: 'price', value: price });
      this.priceSeted = price;
    }
  },
  computed: {
    ...mapGetters({
      getItem: 'items/getItem',
      getIncome: 'incomes/getIncome',
      getComments: 'comments/getComments',
      getComment: 'comments/getComment',
      getIsOutcome: 'getIsOutcome',
      getUserLastItems: 'items/getUserLastItems',
      getSelectedItems: 'items/getSelectedItems',
      getSelectedItemsAdd: 'items/getSelectedItemsAdd',
      getShowDialogIncome: 'getShowDialogIncome',
      getGlobalItemVars: ' items/getGlobalItemVars',
      getCurrencyConfig: 'getCurrencyConfig',
      getuser: 'users/user'
    }),

    COMMENTS: function(val) {
      return this.getComments;
    },
    COMMENT: function(val) {
      return this.getComment;
    },

    PRICES(val) {
      return {
        last:
          this.getUserLastItems.length > 0
            ? this.getUserLastItems[this.optIndex].lastPrice
            : 0,
        stock:
          this.getUserLastItems.length > 0
            ? this.getUserLastItems[this.optIndex].price
            : 0
      };
    },

    currencyScope(val) {
      return {
        symbol: this.getIncome._id
          ? this.getIncome.currency.prefix
          : this.getuser.currency.prefix,
        precision: this.getIncome._id
          ? this.getIncome.currency.precision
          : this.getuser.currency.precision,
        options: {
          thousandsSeparator: this.getIncome._id
            ? this.getIncome.currency.thousand
            : '.',
          decimalSeparator: this.getIncome._id
            ? this.getIncome.currency.decimal
            : ',',
          spaceBetweenAmountAndSymbol: true
        }
      };
    }
  },

  watch: {
    getItem: {
      handler(val) {
        this.acomplete.initialValue = val.name;
      },
      deep: true
    },
    localQuantity: function(val) {
      let number = val < 0 ? 0 : val;

      if (this.getSelectedItemsAdd.length > 0) {
        this.setGlobalsCreate({ attr: 'quantity', value: parseInt(number) });
      } else {
        this.setItem({
          attr: 'quantity',
          value: parseInt(number)
        });
      }
    },

    getSelectedItemsAdd(val) {
      this.sheet = this.getSelectedItemsAdd.length > 0 ? true : false;
    }
  }
};
</script>
<style>
.md-content {
  max-width: 400px;
  max-height: 100vh !important;
  overflow: auto;
}
.btn {
  width: 100%;
}
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

.v-input__slot {
  margin: 0;
}
.v-input .v-text-field {
  margin: 0 !important;
  padding: 0 !important;
}

.v-toolbar__content {
  padding: 0;
  height: 100% !important;
}

.v-input {
  margin: 0 !important;
  padding: 0 !important;
}

.search {
  max-width: 600px;
}

@media only screen and (max-width: 599px) {
  .v-bottom-sheet.v-dialog.v-bottom-sheet--inset {
    margin-bottom: 11%;
    box-shadow: none;
  }
}
</style>
