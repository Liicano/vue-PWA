<template>
  <div>
    <!-- ============================= -->
    <!-- DIALOGS -->
    <!-- ============================= -->
    <md-dialog :md-active.sync="getShowDialogIncome" v-if="inMobile">
      <!-- <md-dialog-title>
        <div class="row">
          <div class="col s4">
         
          </div>

          <div class="col s4"></div>

          <div class="col s4">
            <span class="right" @click="displayDialog(false, false, false, true)">
              <md-icon>close</md-icon>
            </span>
          </div>
        </div>
      </md-dialog-title>-->
      <md-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-45 md-small-size-100" style="padding: 0">
            <item-form :item="getItem" v-if="(inMobile) && (getShowDialogIncome)"></item-form>
          </div>
        </div>
      </md-content>
      <md-dialog-actions>
        <dialog-button
          @clickFunction="addLine()"
          :colorClass="'md-success'"
          :buttonName="'AGREGAR'"
          style="z-index: 1000;"
        ></dialog-button>
      </md-dialog-actions>
      <br>
    </md-dialog>

    <modal v-if="dialogContactDetail" @close="showContactDetail">
      <template slot="header">
        <md-button
          class="md-simple md-just-icon md-round modal-default-button"
          @click="showContactDetail"
        >
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <center v-if="(INCOME.client.data || INCOME.client.data != null)">
          <div
            class="md-layout-item md-size-10 md-small-size-20 valign-wrapper"
            v-if="(INCOME.client.type && INCOME.client.type == 'User')"
          >
            <md-avatar v-if="INCOME.client.data.imgUrl">
              <img @click="showContactDetail" :src="getUserImg()" alt="Avatar">
            </md-avatar>

            <md-avatar v-else>
              <img @click="showContactDetail" src="../../assets/img/company_icon.png" alt="Avatar">
            </md-avatar>
          </div>

          <div v-else class="md-layout-item md-size-10 md-small-size-20 valign-wrapper">
            <md-avatar>
              <img
                @click="showContactDetail"
                src="../../../public/img/default-avatar.png"
                alt="Avatar"
              >
            </md-avatar>
          </div>

          <b>{{getUserName()}}</b>

          <!-- <p>{{(CR_HANDLER == 'income')? INCOME_CLIENT.email : INCOME_RESPONSABLE.email}}</p> -->
        </center>

        <center v-if="(!INCOME.client.data || INCOME.client.data == null)">
          <h6>" {{(INCOME.contactName && INCOME.contactName != null)?INCOME.contactName:INCOME.client.name}} " no existe</h6>
          <md-button class="md-success md-raised">Añadir a contactos</md-button>
        </center>
      </template>

      <template slot="footer">
        <md-button v-if="INCOME.client.type" class="md-info md-simple">Ver contacto</md-button>
      </template>
    </modal>

    <md-dialog :md-active.sync="showDialogMessage">
      <md-content>
        <md-dialog-title>
          <div class="row">
            <div class="col s4">
              <span class="left"></span>
            </div>

            <div class="col s4"></div>

            <div class="col s4">
              <span class="right" @click="displayDialogMsg(false, false, false, true);">
                <md-icon>close</md-icon>
              </span>
            </div>
          </div>
        </md-dialog-title>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 md-small-size-100" style="padding: 0">
            <commentsModule :movement="INCOME"></commentsModule>
          </div>
        </div>
        <md-dialog-actions>
          <dialog-button
            @clickFunction="newComment"
            :colorClass="'md-success'"
            :buttonName="'Enviar comentario'"
            style="z-index: 100;"
          ></dialog-button>
        </md-dialog-actions>
      </md-content>
    </md-dialog>

    <md-dialog :md-active.sync="showDialogContac">
      <md-dialog-title>
        <div class="row">
          <div class="col s4"></div>

          <div class="col s4"></div>

          <div class="col s4">
            <span class="right" @click="displayDialogContact(false, false, false, true)">
              <md-icon>close</md-icon>
            </span>
          </div>
        </div>
      </md-dialog-title>
      <md-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 md-small-size-100" style="padding: 0">
            <new-contact></new-contact>
          </div>
        </div>
      </md-content>
      <md-dialog-actions>
        <dialog-button
          @clickFunction="newContact"
          :colorClass="'md-success'"
          :buttonName="'Crear contacto'"
          style="z-index: 100;"
        ></dialog-button>
      </md-dialog-actions>
      <br>
    </md-dialog>

    <modal v-if="optionalEmail" @close="handleOptionalEmailModal(false)">
      <template slot="header">
        <md-button
          class="md-simple md-just-icon md-round modal-default-button"
          @click="handleOptionalEmailModal(false)"
        >
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <div class="container-fluid">
          <center>
            <small>Ingresa el correo de "{{this.getIncome.client.name.toUpperCase()}}"</small>

            <md-field>
              <md-input
                @input.native="setOpcionalUser($event.target)"
                :placeholder="'email@gmail.com'"
              ></md-input>
            </md-field>
          </center>
        </div>
      </template>

      <template slot="footer">
        <center>
          <md-button type="email" class="md-success md-dense" @click="saveOptionalUser()">Enviar</md-button>
        </center>
      </template>
    </modal>

    <!-- ============================= -->
    <!-- / DIALOGS -->
    <!-- ============================= -->
    <div v-if="loading">
      <spinner></spinner>
    </div>

    <div v-else>
      <md-card class style="margin:0 !important; border-bottom: none; box-shadow: none;">
        <md-card-header class="md-small-hide"></md-card-header>
        <!-- <div class="md-layout">
          <div class="md-layout-item md-size-90"></div>
          <div class="md-layout-item md-size-10">
            <center></center>
          </div>
        </div>-->
        <md-card-content style="padding: 0;">
          <slide-y-up-transition>
            <div class="md-layout valign-wrapper" v-if="getSeeDetails">
              <div class="md-layout-item md-size-50 md-small-size-100" id="textField" style>
                <br>

                <v-text-field
                  outline
                  id="noMaterialize"
                  name="name"
                  autofocus
                  color="green"
                  background-color="grey lighten-2"
                  label="Referencia"
                  prepend-inner-icon="note_add"
                  :value="getIncome.name"
                  @input.native="updateIncome($event.target)"
                ></v-text-field>
              </div>

              <div
                :class="['md-layout-item md-size-50 md-small-size-100', (inMobile)? 'containerMobile': 'containerDesktop']"
                style="padding: 0;"
              >
                <div class="md-layout md-alignment-center-center">
                  <div class="md-layout-item md-size-80" id="textField">
                    <md-field>
                      <autocomplete
                        style="width: 100%; margin-top:6%;"
                        v-validate="'required'"
                        @clickOnItem="updateIncome"
                        @clickOnCreate="createContact"
                        :config="acomplete"
                        @optionalInputFunction="updateIncome"
                        @blurEvent="blurAction"
                      ></autocomplete>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-20">
                    <center>
                      <!-- ==============================
              IMAGEN DEL USUARIO
                      ==============================-->
                      <center v-if="INCOME.client.type == 'User'">
                        <v-avatar
                          v-if="INCOME.client.data.imgUrl"
                          :tile="false"
                          :size="(inMobile)? 50 : 60"
                        >
                          <img @click="showContactDetail" :src="getUserImg()" alt="Avatar">
                        </v-avatar>

                        <md-avatar v-else>
                          <img
                            @click="showContactDetail"
                            src="../../assets/img/company_icon.png"
                            alt="Avatar"
                          >
                        </md-avatar>
                      </center>

                      <center v-else>
                        <v-avatar :tile="false" :size="(inMobile)? 50 : 60">
                          <img
                            @click="showContactDetail"
                            src="../../../public/img/default-avatar.png"
                            alt="avatar"
                          >
                        </v-avatar>
                      </center>

                      <!-- ==============================
            //   IMAGEN DEL USUARIO
                      ==============================-->
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </slide-y-up-transition>
          <!-- ==============================
              NOMBRE DEL USUARIO
          ==============================-->
          <div v-if="!getSeeDetails" @click="handleSeeDetails()">
            <center>
              <md-content class="md-elevation-3" v-if="inMobile">
                <div v-if="INCOME.client">
                  <!-- <h5>
                    <span>
                      <small>{{getUserName()}}</small>
                    </span>
                    <br>
                    <span>{{INCOME.name}}</span>
                  </h5>-->
                  <v-card class="mx-auto" color="white" dark max-width="400">
                    <v-card-actions>
                      <v-list-tile class="grow">
                        <v-list-tile-avatar color="grey darken-3" v-if="INCOME.client.imgUrl">
                          <v-img class="elevation-6" :src="getUserImg()"></v-img>
                        </v-list-tile-avatar>
                        <v-list-tile-avatar color="grey darken-3" v-else>
                          <v-img class="elevation-6" :src="getUserImg()"></v-img>
                        </v-list-tile-avatar>

                        <v-list-tile-content class="userIncomeClass">
                          <div class="container-fluid">
                            <div class="md-layout">
                              <div
                                class="md-layout-item md-size-100"
                                style="heigth: 0px !important; color: black;"
                              >
                                <p style="margin-bottom: 0;">
                                  <b>{{INCOME.name}}</b>
                                </p>
                                <small class="md-caption">{{getUserName()}}</small>
                              </div>
                            </div>
                          </div>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-card-actions>
                  </v-card>
                </div>
                <div v-else>
                  <h5>¡Le faltan datos a la venta!
                    <br>
                    <span style="color:blue;">Click aqui!</span>
                  </h5>
                </div>
              </md-content>
              <div v-else>
                <div class="md-layout">
                  <div class="md-layout-item md-size-15">
                    <div class="file-input img-circle" style="margin-left: -0%;">
                      <div class="image-container">
                        <img :src="getUserImg()" class="valign-wrapper">
                      </div>
                    </div>
                  </div>

                  <div class="md-layout-item md-size-70" style="margin-top: -2%;">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-100">
                        <h3 class="pull-left" style="margin-bottom: -15px;">
                          <b>{{INCOME.name | uppercase}}</b>
                        </h3>
                      </div>
                    </div>

                    <div class="md-layout">
                      <div class="md-layout-item md-size-100">
                        <h4 class="pull-left">{{getUserName()}}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item md-size-15">
                    <center>
                      <!-- <md-button class="md-just-icon md-simple md-info">
                        <md-icon>message</md-icon>
                      </md-button>-->
                      <md-button class="md-just-icon blue darken-3 md-round md-dense">
                        <md-icon>timeline</md-icon>
                      </md-button>
                      <!-- <md-button class="md-just-icon md-simple md-danger">
                        <md-icon>delete</md-icon>
                      </md-button>-->
                    </center>
                  </div>
                </div>
              </div>
            </center>
          </div>

          <!-- ==============================
            //  NOMBRE DEL USUARIO
          ==============================-->
          <!-- ==============================
              SECCION DE AGREGAR ITEM (INTERMEDIA) (MOBILE)
          ==============================-->
          <!-- <br class="md-big-hide" v-if="inMobile"> -->
          <div class="md-layout" v-if="inMobile">
            <div class="md-layout-item md-size-100" style="padding:0">
              <!-- <md-button
                  class="md-success md-raised md-round"
                  @click="displayDialog(true, false, true, false); handleSaveIncome();"
              >Agregar item</md-button>-->
              <v-btn
                @click="displayDialog(true, false, true, false); handleSaveIncome();"
                block
                color="green"
                dark
                style="margin: 0 !important"
              >Nueva linea +</v-btn>
            </div>
          </div>
          <!-- <zoom-center-transition :duration="500"> -->
          <!-- <div class="md-layout" v-if="inMobile && getSelectedItems.length > 0">
              <div class="md-layout-item md-size-100">
                <v-subheader
                  class="text-success"
                  
                >{{getSelectedItems.length}} Seleccionados</v-subheader>

                <v-divider></v-divider>
              </div>
          </div>-->
          <!-- <div class="md-layout">
              <div class="md-layout-item md-size-80">
                <v-subheader
                  @click="showHandleItems = !showHandleItems"
                  class="text-success"
                  v-if="inMobile && getSelectedItems.length > 0"
                >{{getSelectedItems.length}} items seleccionados</v-subheader>
              </div>
              <div class="md-layout-item md-size-20">
                <v-btn flat icon color="green" v-if="inMobile && getSelectedItems.length > 0">
                  <v-icon>style</v-icon>
                </v-btn>
              </div>
          </div>-->
          <!-- </zoom-center-transition> -->
          <!-- <v-divider v-if="inMobile && getSelectedItems.length > 0"></v-divider>
          <v-spacer v-if="inMobile && getSelectedItems.length > 0"></v-spacer>-->
          <!-- ==============================
            //  SECCION DE AGREGAR ITEM (INTERMEDIA) (MOBILE)
          ==============================-->
          <!-- <md-divider></md-divider> -->
          <!-- ==============================
              LISTA DE ITEMS Y TOTALES (MOBILE)
          ==============================-->
          <div class="md-layout md-big-hide" style="height: 80vh;">
            <div class="md-small-size-100 md-size-100">
              <md-content @scroll.native="handleScroll($event)">
                <item-list :items="null" class="md-big-hide"></item-list>
              </md-content>
            </div>

            <totales></totales>
          </div>

          <!-- ==============================
            //  LISTA DE ITEMS Y TOTALES (MOBILE)
          ==============================-->
          <!-- ==============================
              SECCION DE AGREGAR ITEM (INTERMEDIA) (DESKTOP)
          ==============================-->
          <!-- TOTALS TOOLBAR (DESKTOP) -->
          <md-toolbar
            v-if="!inMobile"
            class="md-dense md-white"
            style="border-color: #01C73E !important;border-style: solid;border-radius: 10px;"
          >
            <div class="md-layout" style="color: black">
              <div class="md-layout-item md-size-33">
                <center>
                  <small>SUBTOTAL</small>
                  <h4
                    style="margin-top: 5px;"
                  >{{TOTAL.net | currency(getCurrencyConfig.symbol, getCurrencyConfig.decimalNumber, getCurrencyConfig.opt)}}</h4>
                </center>
              </div>
              <div class="md-layout-item md-size-33">
                <center>
                  <small>IMPUESTO</small>
                  <h4
                    style="margin-top: 5px;"
                  >{{(TOTAL.tax) | currency(getCurrencyConfig.symbol, getCurrencyConfig.decimalNumber, getCurrencyConfig.opt)}}</h4>
                </center>
              </div>
              <div class="md-layout-item md-size-33">
                <center>
                  <small>TOTAL</small>
                  <h4
                    style="margin-top: 5px;"
                  >{{(TOTAL.total) | currency(getCurrencyConfig.symbol, getCurrencyConfig.decimalNumber, getCurrencyConfig.opt)}}</h4>
                </center>
              </div>
            </div>
          </md-toolbar>
          <!-- TOTALS TOOLBAR (DESKTOP) -->
          <div class="md-layout md-small-hide">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-card class="md-elevation-5 pull-right" style="width: 100%; z-index:100; ">
                <md-card-header class="md-card-header-icon md-card-header-green">
                  <div class="md-layout">
                    <div class="md-layout-item md-size-50">
                      <h6>ITEMS DE LA VENTA</h6>
                    </div>
                    <div class="md-layout-item md-size-50" v-if="this.getIncome._id">
                      <h6
                        v-if="getSelectedItems.length > 0"
                        class="pull-right text-success"
                        style="cursor:pointer"
                        @click="showHandleItems = !showHandleItems"
                      >
                        <b>{{getSelectedItems.length}} Seleccionados</b>
                      </h6>
                    </div>
                  </div>
                </md-card-header>
                <md-card-content>
                  <item-list :items="null"></item-list>
                </md-card-content>
              </md-card>

              <center>
                <div></div>
              </center>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-card class="md-elevation-5 pull-right" style="width: 100%; z-index:100">
                <md-card-header class="md-card-header-icon md-card-header-green"></md-card-header>
                <md-card-content>
                  <item-form :item="getItem"></item-form>
                  <br>
                  <div class="md-layout" v-if="!inMobile">
                    <button
                      @click="handleLine();"
                      class="btn waves-effect green accent-4"
                      type="submit"
                      name="action"
                      style="border-radius: 15px;"
                    >
                      AGREGAR ITEM
                      <i class="material-icons right">add</i>
                    </button>
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </div>

          <!-- ==============================
              SECCION DE AGREGAR ITEM (INTERMEDIA) (DESKTOP)
          ==============================-->
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
// VUEX
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import store from '../../store/store.js';
import api from '../../lib/api';

import commentsModule from './components/income_comments';
import newContact from '../Dashboard/Components/new_contact';
import { Modal, Tabs } from '@/components';
import itemForm from './components/income_form';
import itemList from './components/income_list';
import isMobile from '../../assets/js/isMobile.js';
import autocomplete from '../Dashboard/Components/autocomplete/autocomplete';
import totales from '../../pages/Dashboard/Components/mobile_total';
import dialogButton from '../Dashboard/Components/dialogButton';
import spinner from '../Dashboard/Components/spinner';
import { ZoomCenterTransition, SlideYUpTransition } from 'vue2-transitions';

export default {
  data() {
    return {
      inMobile: null,
      loading: false,
      isSale: true,
      showDialogContac: false,
      dialogContactDetail: false,
      cleanSelected: false,
      initialPosition: 0,
      acomplete: {
        itemType: 'users',
        initialValue: null,
        principalAtribute: 'name',
        secondaryAtribute: 'email',
        optionalMultipleAtribute: { 1: 'business', 2: 'legalName' },
        secondaryQuery: null,
        placeholder_value: '',
        searchRoute: '',
        res_name: 'client',
        second_level_res: 'data',
        optionalInputFunction_res: { 0: 'contactName' }
      },
      initialObject: null,
      createContactClicked: false,
      showHandleItems: false,
      selection: {
        edit: {
          price: null,
          quantity: null
        },
        delete: null
      }
    };
  },
  components: {
    Modal,
    itemForm,
    itemList,
    autocomplete,
    totales,
    dialogButton,
    spinner,
    Tabs,
    commentsModule,
    newContact,
    ZoomCenterTransition,
    SlideYUpTransition
  },
  methods: {
    ...mapActions({
      getCurrentIncome: 'incomes/getIncome',
      postLine: 'incomes/postLine',
      postItem: 'items/postItem',
      putLine: 'incomes/putLine',
      postIncome: 'incomes/postIncome',
      putIncome: 'incomes/putIncome',
      getAllComments: 'comments/getAllComments',
      postComment: 'comments/postComment',
      postContact: 'contacts/postContact',
      shareIncome: 'incomes/shareIncome',
      findContact: 'contacts/findContact'
    }),

    ...mapMutations({
      setIncome: 'incomes/SET_INCOME',
      cleanIncome: 'incomes/CLEAN',
      cleanItem: 'items/CLEAN',
      setItem: 'items/SET_ITEM',
      hideShowBottom: 'HIDE_SHOW_BOTTOM',
      editorState: 'HANDLE_EDIT',
      changeDialogMessage: 'HANDLE_MSG_DIALOG',
      setContact: 'contacts/SET_CONTACT',
      cleanContact: 'contacts/CLEAN',
      handleOptionalEmail: 'HANDLE_OPTIONAL_EMAIL',
      setOptionalContact: 'incomes/SET_OPTIONAL_CONTACT',
      setComment: 'comments/SET_COMMENT',
      showDetails: 'HANDLE_DETAILS',
      editSelection: 'items/EDIT_SELECTION',
      cleanSelection: 'items/CLEAN_SELECTION',
      setGlobalsCreate: 'items/SET_GLOBALS_CREATE',
      handleItemDialog: 'HANDLE_ITEM_DIALOG',
      showBottomTotals: 'HIDE_SHOW_TOTALS',
      handleSelections: 'items/HANDLE_SELECTIONS'
    }),

    // HANDLE BOTTOM BAR AND INPUT (store)
    displayDialog(dialog, bottomBar, inputs, clean) {
      if (this.inMobile) {
        this.cleanItem();

        this.handleItemDialog(dialog);
        this.hideShowBottom(bottomBar);
      }
    },
    handleDetails() {
      this.$route.params.id ? this.showDetails(false) : this.showDetails(true);
    },
    displayDialogContact(dialog, bottomBar, inputs, clean) {
      if (bottomBar == undefined) {
        dialog = true;
        bottomBar = false;
      }

      this.showDialogContac = dialog;
      this.hideShowBottom(bottomBar);
    },
    createContact(name) {
      // this.createContactClicked = true;
      this.setContact({ attr: 'name', value: name });

      this.displayDialogContact(true, false);
    },

    displayDialogMsg(dialog, bottomBar, inputs, clean) {
      // if (this.inMobile) {
      this.changeDialogMessage(dialog);
      this.hideShowBottom(bottomBar);
      this.showDetails(inputs);
      // }
    },
    showContactDetail() {
      this.dialogContactDetail = !this.dialogContactDetail;
    },

    //  HANDLE LINE
    handleLine() {
      this.saveIncome().then(res => {
        console.log('entro AQUIIIIIIIIIIII!!!! handleLine');

        this.setItem({ attr: 'movement', value: res._id });
        console.log('termino el saveIncome -> ', res);

        if (this.isMobile) {
          this.addLine().then(res => {
            console.log('termino el add line dentro de handle line -> ', res);
            this.cleanItem();
          });
        } else {
          this.addLine();
          this.cleanItem();
        }
      });
    },

    addLine() {
      if (this.getSelectedItemsAdd.length > 0) {
        this.handleDetails();

        this.getSelectedItemsAdd.forEach(e => {
          let item = {
            item: this.getUserLastItems[e]._id,
            name: this.getUserLastItems[e].name,
            movement: this.getIncome._id,
            price:
              this.getUserLastItems[e].lastPrice != undefined
                ? this.getUserLastItems[e].lastPrice
                : 0,
            quantity: 1,
            movementType: this.CR_HANDLER.type,
            currency: this.getIncome.currency
          };
          this.postLine(item).then(res => {
            if (this.inMobile) {
              this.displayDialog(false, false, false, true);
            }
          });
        });
        this.cleanSelection('selectedItemsAdd');
        this.setGlobalsCreate(null);
      } else {
        return new Promise((resolve, reject) => {
          if (this.getItem.name) {
            if (!this.getItem._id || this.getItem.justCreated) {
              if (!this.getItem.item || this.getItem.item == '') {
                let obj = {
                  name: this.getItem.name
                };
                this.postItem(obj).then(res => {
                  this.setItem({
                    attr: 'movementType',
                    value: this.CR_HANDLER.type
                  });
                  this.postLine(this.getItem).then(res => {
                    if (this.inMobile) {
                      this.displayDialog(false, false, false, true);
                      resolve(res);
                    } else {
                      // this.cleanItem();
                      resolve(res);
                    }
                  });
                });
              } else {
                this.handleDetails();
                this.cleanSelection('selectedItemsAdd');
                this.postLine(this.getItem).then(res => {
                  if (this.inMobile) {
                    this.displayDialog(false, false, false, true);
                    resolve(res);
                  } else {
                    // this.cleanItem();
                    resolve(res);
                  }
                });
              }
            } else {
              console.log('Actualizo la linea');
              this.handleDetails();
              this.putLine(this.getItem).then(res => {
                // this.cleanItem();
                if (this.inMobile) {
                  this.displayDialog(false, false, false, true);
                  resolve(res);
                } else {
                  // this.cleanItem();
                  resolve(res);
                }
              });
            }
          } else {
            this.$toasted.show('Seleccione un item', { type: 'danger' });
          }
        });
      }
    },

    // UPDATE MOVEMENT (state)
    updateIncome(event) {
      if (event.name == 'client') {
        this.setClientType(event);
        this.setMovementResponsable(this.CR_HANDLER);

        event.value.user && event.value.user != null
          ? (event.value = event.value.user)
          : event.value.business && event.value.business != null
          ? (event.value = event.value.business)
          : event.value;
      }

      let obj = {
        attr: event.name,
        value: event.value,
        second_level: event.second_level_res ? event.second_level_res : null
      };

      this.setIncome(obj);
    },

    setClientType(client) {
      let setted_type = {
        attr: 'client',
        value:
          client.value.user && client.value.user != null ? 'User' : 'Contact',
        second_level: 'type'
      };

      this.setIncome(setted_type);
    },

    setMovementResponsable(cr_handler) {
      let responsable_data = [
        {
          attr: 'responsable',
          second_level: 'type',
          value: 'User'
        },
        {
          attr: 'responsable',
          second_level: 'data',
          value: this.getUser
        }
      ];
      responsable_data.forEach(e => {
        this.setIncome(e);
      });
    },

    handleSaveIncome() {
      this.blurAction(this.getIncome.contactName).then(res => {
        this.saveIncome();
      });
    },

    // HANDLE MOVEMENT
    saveIncome() {
      return new Promise((resolve, reject) => {
        if (this.errors.items.length > 0 || this.getIncome.name == null) {
          this.$toasted.show('Uno o mas campos erroneos en la venta!', {
            type: 'danger'
          });
        } else {
          if (this.getIncome._id) {
            this.putIncome(this.getIncome).then(res => {
              this.cleanContact();
              resolve(res);

              console.log('ACTUALIZADO!');
            });
          } else {
            if (this.getIncome.responsable.data == null)
              this.setMovementResponsable(this.CR_HANDLER);

            this.postIncome(this.INCOME).then(res => {
              this.cleanContact();
              let movementType =
                this.$route.name == 'Income' ? 'income' : 'outcome';
              this.$router.replace('/' + movementType + '/' + res._id);
              resolve(res);
              console.log('GUARDADO!');
            });
          }
        }
      });
    },
    newComment() {
      let params = {
        parent: this.getIncome._id,
        type: 'movement',
        txt: this.getComment
      };
      this.postComment(params).then(res => {
        this.setComment('');
      });
    },

    newContact() {
      if (this.validateEmail(this.getContact.email)) {
        this.findContact(this.getContact.email).then(res => {
          this.postContact(this.CONTACT).then(res => {
            this.displayDialogContact(false, false, false, true);
            this.setMovementResponsable(this.CR_HANDLER);
            let foo = [
              {
                attr: 'client',
                value: res.user != null ? (res = res.user) : res,
                second_level: 'data'
              },
              {
                attr: 'client',
                value: res.imgUrl ? 'User' : 'Contact',
                second_level: 'type'
              }
            ];

            foo.forEach(e => {
              this.setIncome(e);
            });
          });
        });
      } else {
        this.$toasted.show('Email invalido!', { type: 'danger' });
      }
    },

    handleOptionalEmailModal(payload) {
      this.handleOptionalEmail(payload);
    },
    setOpcionalUser(event) {
      this.OPTIONAL_USER.email = event.value;
    },
    handleInputDisplay(show, isClick) {
      if (this.getIncome._id) {
        if (this.getIncome.editor == this.getUser._id) {
          this.editorState(true);
        } else {
          this.editorState(false);
        }
      } else {
        this.editorState(true);
        this.handleSeeDetails();
      }
    },

    handleSeeDetails() {
      if (this.getEnableEdit) {
        this.showDetails(true);
      }
    },

    saveOptionalUser() {
      this.setOptionalContact(this.OPTIONAL_USER);
      if (this.OPTIONAL_USER.email) {
        console.log('PAYLOAD ANTES DEL  SHARE_INCOME -> ', this.getIncome);
        this.shareIncome(this.getIncome).then(() => {
          this.handleOptionalEmailModal(false);
          this.$toasted.show('Cotizacion enviada!');
        });
      } else {
        this.$toasted.show('Ingresa un correo!', { type: 'info' });
      }
    },
    getUserImg() {
      if (this.CR_HANDLER.type == 'income') {
        if (this.INCOME.client.data) {
          if (this.INCOME.client.data.imgUrl) {
            return this.INCOME.client.data.imgUrl;
          } else {
            return require('../../../public/img/default-avatar.png');
          }
        } else {
          return require('../../../public/img/default-avatar.png');
        }
      } else {
        if (this.getIncome._id) {
          if (this.INCOME.client.data) {
            if (this.INCOME.client.data.imgUrl) {
              return this.INCOME.client.data.imgUrl;
            } else {
              return require('../../../public/img/default-avatar.png');
            }
          } else {
            return require('../../../public/img/default-avatar.png');
          }
        } else {
          if (this.INCOME.responsable.type == 'User') {
            console.log('Entro en el segundo con user');

            if (this.INCOME.responsable.data.imgUrl) {
              return this.INCOME.responsable.data.imgUrl;
            } else {
              return require('../../assets/img/company_icon.png');
            }
          } else {
            console.log('Entro en el segundo sin user');

            return require('../../../public/img/default-avatar.png');
          }
        }
      }
    },
    getUserName() {
      switch (this.CR_HANDLER.type) {
        case 'income':
          if (
            !this.INCOME[this.CR_HANDLER.receptor].type ||
            this.INCOME[this.CR_HANDLER.receptor].type == null
          ) {
            return this.INCOME[this.CR_HANDLER.receptor].name;
          } else {
            return this.INCOME[this.CR_HANDLER.receptor].data.name;
          }

          break;

        case 'outcome':
          if (
            !this.INCOME[this.CR_HANDLER.emisor].type ||
            this.INCOME[this.CR_HANDLER.emisor].type == null
          ) {
            return this.INCOME[this.CR_HANDLER.emisor].name;
          } else {
            if (this.getIncome._id) {
              return this.INCOME[this.CR_HANDLER.emisor].data.name;
            } else {
              return this.INCOME[this.CR_HANDLER.receptor].data.name;
            }
          }
          break;
      }
    },
    setInitial(payload) {
      this.initialObject = payload;
    },
    compareOnExit(payload) {
      if (JSON.stringify(this.initialObject) === JSON.stringify(this.INCOME)) {
        console.log('');
      } else {
        if (this.getIncome._id) {
          this.saveIncome();
        }
      }
    },

    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    blurAction(query, click) {
      console.log('sfds');
      return new Promise((resolve, reject) => {
        console.log('blurEvent', query);

        this.findContact(this.getIncome.contactName).then(res => {
          if (res) {
            console.log(res);
            resolve(true);
          } else {
            if (this.validateEmail(query)) {
              let contactName = query.split('@');

              this.setContact({ attr: 'name', value: contactName[0] });
              this.setContact({ attr: 'email', value: query });

              this.postContact(this.CONTACT).then(res => {
                this.displayDialogContact(false, false, false, true);
                this.setMovementResponsable(this.CR_HANDLER);
                let foo = [
                  {
                    attr: 'client',
                    value: res.user != null ? (res = res.user) : res,
                    second_level: 'data'
                  },
                  {
                    attr: 'client',
                    value: res.imgUrl ? 'User' : 'Contact',
                    second_level: 'type'
                  }
                ];
                foo.forEach(e => {
                  this.setIncome(e);
                });
                resolve(true);
              });
            } else {
              resolve(true);
            }
          }
        });
      });
    },
    handleScroll(event) {
      if (event.target.scrollTop > this.initialPosition) {
        this.showBottomTotals(false);
      } else if (event.target.scrollTop < this.initialPosition) {
        this.showBottomTotals(true);
      }

      this.initialPosition = event.target.scrollTop;
    }
  },

  created() {
    this.inMobile = isMobile;
    // AUTOCOMPLETE CONFIG
    this.acomplete.searchRoute = api + '/contacts/find/self/';

    // GENERAL CONFIG (ID OR NOT ID)
    if (this.$route.params.id) {
      this.loading = true;

      this.getCurrentIncome(this.$route.params.id).then(res => {
        this.showDetails(false);
        this.handleInputDisplay();
        this.loading = false;
        this.setInitial(this.INCOME);
      });
    } else {
      this.cleanIncome();
      this.cleanItem();
      this.showDetails(true);
    }

    if (this.$route.name == 'Outcome') {
      this.hideShowBottom(false);
    }

    !this.isSale
      ? (this.acomplete.placeholder_value = 'Proveedor')
      : (this.acomplete.placeholder_value = 'Cliente');
  },
  mounted() {
    this.acomplete.initialValue = this.INCOME_CLIENT;
  },

  computed: {
    ...mapState({
      showTotals: state => state.showTotals,
      showDialogMessage: state => state.showDialogMessage,
      optionalEmail: state => state.optionalEmail
    }),

    ...mapGetters({
      getIncome: 'incomes/getIncome',
      getItem: 'items/getItem',
      getContact: 'contacts/getContact',
      getComment: 'comments/getComment',
      getUser: 'users/user',
      getEnableEdit: 'getEnableEdit',
      getSeeDetails: 'getSeeDetails',
      getSelectedItems: 'items/getSelectedItems',
      getSelectedItemsAdd: 'items/getSelectedItemsAdd',
      getUserLastItems: 'items/getUserLastItems',
      getGlobalItemVars: 'items/getGlobalItemVars',
      getShowDialogIncome: 'getShowDialogIncome',
      getShowTotals: 'getShowTotals',
      getCurrencyConfig: 'getCurrencyConfig'
    }),

    CR_HANDLER() {
      switch (this.$route.name) {
        case 'Income':
          return {
            emisor: 'responsable',
            receptor: 'client',
            type: 'income'
          };
          break;

        case 'Outcome':
          return {
            emisor: 'client',
            receptor: 'responsable',
            type: 'outcome'
          };
          break;

        default:
      }
    },

    INCOME_CLIENT() {
      if (
        this.getIncome[this.CR_HANDLER.receptor].type &&
        this.getIncome[this.CR_HANDLER.receptor].type != null
      ) {
        return this.getIncome[this.CR_HANDLER.receptor].data;
      } else {
        if (this.getIncome._id) {
          return this.getIncome[this.CR_HANDLER.receptor].name;
        } else {
          return this.getIncome.contactName;
        }
      }
    },
    INCOME_RESPONSABLE() {
      if (
        this.getIncome[this.CR_HANDLER.emisor].type &&
        this.getIncome[this.CR_HANDLER.emisor].type != null
      ) {
        return this.getIncome[this.CR_HANDLER.emisor].data;
      } else {
        if (this.$route.params.id) {
          return this.getIncome[this.CR_HANDLER.emisor].name;
        } else {
          return this.getIncome.contactName;
        }
      }
    },

    INCOME() {
      return {
        _id: this.getIncome._id,
        name: this.getIncome.name,
        description: this.getIncome.description,
        dates: {
          expiration: null
        },
        creator: this.getIncome.creator,
        contactName: this.getIncome.client.name
          ? this.getIncome.client.name
          : null,

        client:
          this.getIncome[this.CR_HANDLER.receptor].type &&
          this.getIncome[this.CR_HANDLER.receptor].type != null
            ? {
                type: this.getIncome[this.CR_HANDLER.receptor].type,
                data: this.INCOME_CLIENT
              }
            : { name: this.INCOME_CLIENT },

        responsable:
          this.getIncome[this.CR_HANDLER.emisor].type &&
          this.getIncome[this.CR_HANDLER.emisor].type != null
            ? {
                type: this.getIncome[this.CR_HANDLER.emisor].type,
                data: this.INCOME_RESPONSABLE
              }
            : { name: this.INCOME_RESPONSABLE },

        // ONLY FOR POST REQUEST, IN GET REQUEST IM USING GETTER (this.getIncome)
        editor:
          this.CR_HANDLER.type == 'income'
            ? this.INCOME_RESPONSABLE
            : this.INCOME_CLIENT,

        lines: [],
        total: {
          net: 0,
          tax: 0
        },
        state: 'draft',
        isActive: true,
        currency: null
      };
    },

    OPTIONAL_USER() {
      return {
        name:
          this.CR_HANDLER.type == 'income'
            ? this.getIncome.client.name
            : this.getIncome.responsable.name,
        email: null
      };
    },
    CONTACT() {
      return {
        creator: this.getContact.creator,
        email: this.getContact.email,
        isActive: true,
        name: this.getContact.name,
        phone: this.getContact.phone,
        user: this.getContact.user
      };
    },
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
  },

  watch: {
    INCOME_CLIENT: function(val) {
      console.log('this.INCOME_CLIENT -> ', this.INCOME_CLIENT);
      console.log('this.INCOME_RESPONSABLE -> ', this.INCOME_RESPONSABLE);
      if (val) {
        if (!val.name) {
          this.acomplete.initialValue = val;
        } else {
          this.acomplete.initialValue = val.name;
        }
      }
    }
  },

  // NAVIGATIONS GUARDS
  beforeRouteEnter: (to, from, next) => {
    store.commit('HIDE_SHOW_BOTTOM', false);
    store.commit('HIDE_SHOW_TOTALS', true);
    store.commit('HIDE_SHOW_NAVBAR', false);

    next();
  },

  beforeRouteLeave(to, from, next) {
    store.commit('HIDE_SHOW_BOTTOM', true);
    store.commit('HIDE_SHOW_TOTALS', false);
    store.commit('HIDE_SHOW_NAVBAR', true);
    this.compareOnExit();

    next();
  }
};
</script>

<style lang="scss" scoped>
// .contentDialog {
//   max-width: 100%;
//   max-height: 100% !important;
//   overflow: auto;
// }

.md-content {
  max-width: 500px;
  max-height: 460px;
  overflow: auto;
}

.md-menu-content-bottom-start {
  z-index: 110;
}

.md-big-hide {
  display: none;
}
@media (max-width: 618px) {
  .md-big-hide {
    display: block;
  }
}
.userIncomeClass {
  height: 200%;
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
  padding: 0;
  margin-top: 10px;
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
.avatarDesktop {
  margin-top: 90% !important;
}
.avatarMobile {
  margin-top: 100% !important;
}
.containerMobile {
  margin-top: -10%;
}
.containerDesktop {
  margin-top: -2.6px;
}
</style>
