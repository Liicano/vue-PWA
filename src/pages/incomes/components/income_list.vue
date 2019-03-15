<template>
  <div>
    <!-- ITEM DETAILS DIALOG -->
    <v-dialog
      v-model="itemDetails"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      id="itemDetails"
    >
      <v-card>
        <v-toolbar dark color="green">
          <v-toolbar-items>
            <v-btn dark flat @click="itemDetails = false">SALIR</v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-toolbar-title>{{actualItem.name | uppercase}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="saveItem()">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <itemDetailsComponent v-if="itemDetails" :propID="actualItem._id"/>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- // ITEM DETAILS DIALOG -->
    <div class="md-layout" v-if="(getIncome.lines) && getIncome.lines.length > 0 && isMobile">
      <div class="md-layout-item md-size-100" style="padding: 0;">
        <ul class="collection" style="border:none;">
          <div>
            <v-list two-line subheader>
              <transition-group name="slide-fade">
                <v-list-tile
                  style="padding:0 !important"
                  v-for="(line, index) in getIncome.lines"
                  :key="line._id"
                  avatar
                  id="itemList"
                  :value="selectedItems"
                  v-touch="{ 
                    left: (event) => showOptions(line, index),
                    right: (event) => removeLine(line)
                  }"
                >
                  <div style="display: contents;" :class="{'hideItem' : !lineOptions}">
                    <v-list-tile-content>
                      <div class="md-layout">
                        <div class="md-layout-item md-size-33">
                          <center>
                            <v-btn flat icon color="green">
                              <v-icon>edit</v-icon>
                            </v-btn>
                          </center>
                        </div>
                        <div class="md-layout-item md-size-33">
                          <center>
                            <v-btn flat icon color="blue darken-2">
                              <v-icon>insert_chart</v-icon>
                            </v-btn>
                          </center>
                        </div>
                        <div class="md-layout-item md-size-33">
                          <center>
                            <v-btn flat icon color="yellow darken-2">
                              <v-icon>person</v-icon>
                            </v-btn>
                          </center>
                        </div>
                      </div>
                    </v-list-tile-content>
                  </div>

                  <div style="display: contents;" :class="{'hideItem' : lineOptions}">
                    <v-list-tile-avatar id="avatar" @click="selectItem(index, true)">
                      <v-icon
                        v-if="getSelectedItems.indexOf(index) < 0"
                        class="headline white green--text"
                      >{{line.name.charAt(0) | uppercase}}</v-icon>
                      <v-icon v-else class="green white--text">check</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content @click="selectItem(index)">
                      <v-list-tile-title style="color: #424242" class="body-1">{{ line.name }}</v-list-tile-title>
                      <v-list-tile-sub-title
                        class="caption"
                      >{{line.quantity}} x {{line.price | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action @click="selectItem(index)">
                      <div class="md-layout">
                        <div
                          :class="[(showCheckbox)?'md-layout-item md-size-80':'md-layout-item md-size-100']"
                          style="padding: 0"
                        >
                          <small
                            class="body-1 green--text"
                          >{{line.price * line.quantity | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</small>
                        </div>
                      </div>
                    </v-list-tile-action>
                  </div>
                </v-list-tile>
              </transition-group>
              <!-- @click="seeDetails(line)" -->
            </v-list>
          </div>
        </ul>
      </div>
    </div>

    <div class="md-layout" v-if="(getIncome.lines) && (getIncome.lines.length > 0) && !isMobile">
      <div class="md-layout-item md-size-100 md-small-size-100" style="padding: 0 !important;">
        <!-- <md-content class="md-scrollbar"> -->
        <md-content class="md-scrollbar" style="height: 250px;">
          <!-- <center>
            <spinner></spinner>
          </center>-->
          <ul class="collection" style="border:none;">
            <div>
              <v-list two-line subheader>
                <transition-group name="slide-fade">
                  <v-list-tile
                    style="padding:0 !important"
                    v-for="(line, index) in getIncome.lines"
                    :key="line._id"
                    avatar
                    id="itemList"
                    :value="selectedItems"
                    v-hammer:swipe.right="(event)=> removeLine(line)"
                  >
                    <div style="display: contents;">
                      <v-list-tile-avatar @click="seeDetails(line)">
                        <v-icon
                          v-if="getSelectedItems.indexOf(index) < 0"
                          class="headline white green--text"
                        >{{line.name.charAt(0) | uppercase}}</v-icon>
                        <v-icon v-else class="green white--text">check</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content @click="selectItem(index)">
                        <v-list-tile-title style="color: #424242" class="body-1">{{ line.name }}</v-list-tile-title>
                        <v-list-tile-sub-title
                          class="caption"
                        >{{line.quantity}} x {{line.price | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <div class="md-layout">
                          <div
                            :class="[(showCheckbox)?'md-layout-item md-size-80':'md-layout-item md-size-100']"
                            style="padding: 0"
                          >
                            <small
                              class="body-1 green--text"
                            >{{line.price * line.quantity | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</small>
                          </div>
                        </div>
                      </v-list-tile-action>
                    </div>
                  </v-list-tile>
                </transition-group>
              </v-list>
            </div>
          </ul>
        </md-content>
      </div>
    </div>
    <div class="md-layout" v-if="getIncome.lines.length <= 0" style="height: 250px;">
      <div class="md-layout-item md-size-100 md-small-size-100">
        <center>
          <!-- <md-empty-state class="md-info" md-icon="shopping_basket" md-label="Lista vacia"></md-empty-state> -->
        </center>
      </div>
    </div>

    <br>

    <br>

    <v-bottom-sheet inset hide-overlay persistent v-model="sheet">
      <v-card tile>
        <div class="md-layout">
          <div class="md-layout-item md-size-90">
            <v-subheader v-if="getSelectedItems.length <= 0">{{getItem.name |uppercase}}</v-subheader>
            <v-btn
              v-else
              flat
              color="red"
              class="pull-left"
              @click="handleEditSelection(true); sheet = !sheet"
            >ELIMINAR</v-btn>
          </div>
          <div class="md-layout-item md-size-10">
            <v-btn flat color="green " class="pull-right" @click="addLine(); sheet = !sheet">GUARDAR</v-btn>
          </div>
        </div>

        <div class="md-layout" v-if="getSelectedItems.length == 1 || getItem.item">
          <div class="md-layout-item md-size-50">
            <center>
              <small class="md-success" style="color:green">Ultimo precio</small>

              <p
                v-if="getSelectedItems.length == 1"
              >{{getLastPrice() | currency(currencyScope.symbol, currencyScope.precision, currencyScope.options)}}</p>
            </center>
          </div>
          <div class="md-layout-item md-size-50">
            <center>
              <small style="color:green">En stock</small>
              <p>$ 95.000</p>
            </center>
          </div>
        </div>
        <div class="md-layout">
          <div
            class="md-layout-item md-size-100"
            style="padding:0"
            v-if="getSelectedItems.length == 1 || getItem.item"
          >
            <center>
              <div class="md-layout">
                <div class="md-layout-item md-size-100" style="padding:0">
                  <center>
                    <br>
                    <v-list>
                      <v-subheader v-if="getItem.item">{{getItem.name | uppercase}}</v-subheader>

                      <v-list-tile>
                        <v-layout justify-center fill-height>
                          <v-flex xs6 id="textField">
                            <v-text-field
                              name="price"
                              @input.native="updateItem($event.target)"
                              type="number"
                              label="Precio"
                              solo
                              append-icon="attach_money"
                              color="green"
                            ></v-text-field>
                          </v-flex>
                          <v-spacer></v-spacer>
                          <h4></h4>
                          <v-spacer></v-spacer>
                          <v-flex xs6>
                            <v-layout id="textField">
                              <v-flex xs9>
                                <v-text-field
                                  @input.native="updateItem($event.target)"
                                  name="quantity"
                                  type="number"
                                  label="#"
                                  min="0"
                                  v-model="localQuantity"
                                  solo
                                  append-icon="swap_vert"
                                  color="green"
                                ></v-text-field>
                              </v-flex>
                              <v-spacer></v-spacer>
                              <v-flex xs3 style="margin-top: -14%">
                                <v-layout align-center>
                                  <v-flex xs12>
                                    <v-btn
                                      flat
                                      icon
                                      color="green white--text"
                                      @click="changeQuantity('add')"
                                    >
                                      <v-icon>add</v-icon>
                                    </v-btn>
                                  </v-flex>
                                </v-layout>

                                <v-layout align-center>
                                  <v-flex xs12>
                                    <v-btn
                                      flat
                                      icon
                                      color="red white--text"
                                      @click="changeQuantity('remove')"
                                    >
                                      <v-icon>remove</v-icon>
                                    </v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-list-tile>
                    </v-list>
                    <br>
                  </center>
                </div>
              </div>
            </center>
          </div>
          <!-- <zoom-center-transition :duration="1" v-else> -->
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
          <!-- </zoom-center-transition> -->
        </div>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { Modal } from '@/components';
import itemForm from '../components/income_form';
import isMobile from '../../../assets/js/isMobile.js';
import dialogButton from '../../Dashboard/Components/dialogButton';
import { ZoomCenterTransition, SlideXRightTransition } from 'vue2-transitions';
import spinner from '../../Dashboard/Components/spinner';
import itemDetailsComponent from '../../items/item';

export default {
  props: {
    // items: []
  },

  components: {
    Modal,
    itemForm,
    dialogButton,
    ZoomCenterTransition,
    SlideXRightTransition,
    spinner,
    itemDetailsComponent
  },

  data() {
    return {
      localItems: {},
      showDialog: false,
      isMobile: '',
      selectedItems: [],
      showCheckbox: false,
      showItem: true,
      sheet: false,
      localQuantity: 0,
      checkboxTest: null,
      itemDetails: false,
      actualItem: {},
      lineOptions: false
    };
  },

  created() {
    this.localItems = this.items;
    this.isMobile = isMobile;
  },
  mounted() {
    this.localQuantity = !isNaN(this.getItem.quantity)
      ? this.getItem.quantity
      : parseInt(this.getItem.quantity);
  },

  methods: {
    ...mapActions({
      deleteLine: 'incomes/deleteLine',
      postLine: 'incomes/postLine',
      putLine: 'incomes/putLine',
      findItem: 'items/findItem',
      putItem: 'items/putItem'
    }),
    ...mapMutations({
      changeItem: 'items/SET_ITEM',
      hideShowBottom: 'HIDE_SHOW_BOTTOM',
      cleanItem: 'items/CLEAN',
      newLine: 'incomes/ADD_LINE',
      setGlobalsCreate: 'items/SET_GLOBALS_CREATE',
      editSelection: 'items/EDIT_SELECTION',
      handleCheckbox: 'items/HANDLE_CHECKBOX',
      handleSelections: 'items/HANDLE_SELECTIONS'
    }),

    selectItem(index, multiple) {
      if (multiple) {
        this.handleSelections({ var: 'selectedItems', index: index });
      } else {
        this.handleSelections({
          var: 'selectedItems',
          index: index,
          isSingle: true
        });
      }
    },

    updateItem(event) {
      if (this.getSelectedItems.length > 0) {
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
        this.changeItem(obj);
      }
    },
    closeDialog(dialog, bottomBar) {
      if (this.isMobile) {
        this.showDialog = dialog;
        this.hideShowBottom(bottomBar);
      }
    },

    addLine() {
      this.updateItem({ name: 'movementType', value: this.MOVEMENT_TYPE });

      if (this.getSelectedItems.length > 0) {
        console.log('entro en el muchos');
        this.handleEditSelection(false);
      } else {
        if (this.getItem.name) {
          if (!this.getItem._id) {
            this.postLine(this.getItem).then(res => {
              this.$toasted.show('Agregado con exito!');
              this.closeDialog(false, false);
            });
          } else {
            console.log('entro en el putttt');
            this.changeItem({
              attr: 'currency',
              value: this.getIncome.currency
            });
            this.putLine(this.getItem).then(res => {
              this.closeDialog(false, false);
              this.cleanItem();
            });
          }
        } else {
          this.$toasted.show('Item inexistente!', { type: 'danger' });
        }
      }
    },

    // ELIMINAR ITEM DE LA VENTA
    removeLine(line) {
      this.showItem = false;
      this.deleteLine(line).then(res => {
        this.$toasted.show('Eliminado con exito!');
        this.closeDialog(false, false);
        this.showItem = true;
      });
    },
    showOptions(line, index) {
      this.lineOptions = !this.lineOptions;
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
    handleEditSelection(isDelete) {
      let editObj = {
        var: 'selectedItems',
        movementType: this.MOVEMENT_TYPE,
        edit: {
          price: this.getGlobalItemVars.price,
          quantity: this.getGlobalItemVars.quantity
        },
        delete: isDelete
      };

      this.editSelection(editObj);
    },

    seeDetails(line) {
      this.findItem(line.item).then(res => {
        console.log(res);
        this.actualItem = res;
        this.itemDetails = true;
      });
    },
    saveItem() {
      this.putItem(this.getItem).then(res => {
        this.itemDetails = false;
      });
    },
    getLastPrice() {
      // console.log(this.getIncome.lines[this.getSelectedItems[0]]);
      // console.log(this.getUserLastItems[this.getSelectedItems[0]]);
      if (
        this.getIncome.lines.length > 0 &&
        this.getSelectedItems.length == 1
      ) {
        let lastPrice = this.getIncome.lines[
          this.getSelectedItems[0]
        ].item.global.filter(
          item => item.currency == this.getUser.currency._id
        );

        console.log(lastPrice);
        if (this.MOVEMENT_TYPE == 'income') {
          return lastPrice[0] ? lastPrice[0].lastPrice.sell : 0;
        } else {
          return lastPrice[0] ? lastPrice[0].lastPrice.buy : 0;
        }
      } else {
        return 0;
      }
    }
  },
  computed: {
    ...mapGetters({
      getItem: 'items/getItem',
      getIncome: 'incomes/getIncome',
      getSelectedItems: 'items/getSelectedItems',
      getGlobalItemVars: 'items/getGlobalItemVars',
      getUserLastItems: 'items/getUserLastItems',
      getSelectedItemsAdd: 'items/getSelectedItemsAdd',
      getUser: 'users/user'
    }),
    MOVEMENT_TYPE() {
      return this.$route.name == 'Income' ? 'income' : 'outcome';
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
    getSelectedItems(val) {
      this.sheet = this.getSelectedItems.length > 0 ? true : false;
    },
    localQuantity: function(val) {
      let number = val < 0 ? 0 : val;
      if (this.getSelectedItems.length > 0) {
        this.setGlobalsCreate({ attr: 'quantity', value: parseInt(number) });
      } else {
        this.changeItem({
          attr: 'quantity',
          value: parseInt(number)
        });
      }
    }
  }
};
</script>
<style>
.md-content {
  min-width: 100%;
  max-height: 300px;
  overflow: auto;
}
.md-big-hide {
  display: none;
}
.itemListOptions {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
}
#itemList:hover .itemListOptions {
  visibility: visible;
  opacity: 1;
}
.collection .collection-item.avatar {
  min-height: 69px !important;
}
.collection .collection-item {
  border-bottom: none !important;
}

@media only screen and (max-width: 599px) {
  .v-bottom-sheet.v-dialog.v-bottom-sheet--inset {
    margin-bottom: 15%;
    box-shadow: none;
  }
}

@media (min-width: 992px) {
  .v-dialog.v-dialog--active.v-dialog--fullscreen {
    padding-left: 5.5% !important;
  }
}

/* .v-avatar {
  border-radius: 100%;
  border-color: green;
  border-style: solid;
} */

.hideItem {
  display: none !important;
}
</style>
