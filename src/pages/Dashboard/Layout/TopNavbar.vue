<template>
  <div>
    <div class="main-toolbar">
      <md-toolbar
        id="toolbar"
        v-if="!this.$route.meta.hideNavbar"
        class="md-success md-dense flex: 1"
        :class="{'md-toolbar-absolute md-fixed-top': $route.meta.navbarAbsolute}"
        style="background-color: #01C73E !important; width: 100%"
      >
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start md-small">
            <md-button
              class="md-just-icon md-round md-simple md-white"
              style="margin-left: -20%"
              @click="$router.go(-1); handleBottomNav(true)"
            >
              <md-icon>arrow_back</md-icon>
            </md-button>

            <router-link :to="{path:'/user/profile'}" tag="a" class="brand-logo" v-if="isMobile">
              <offline @detected-condition="handleConnectivityChange">
                <div slot="online">
                  <div v-if="!getBusinessScope._id">
                    <md-avatar v-if="user.imgUrl" class="avatarMobile">
                      <img :src="user.imgUrl" alt="Avatar">
                    </md-avatar>

                    <md-avatar v-else class="avatarMobile">
                      <img src="../../../assets/img/profile.png" alt="Avatar">
                    </md-avatar>
                  </div>

                  <div v-else>
                    <div class="avatarContainer">
                      <span class="avatarNavbar demo-badge" v-if="user.imgUrl">
                        <md-avatar>
                          <img :src="user.imgUrl">
                        </md-avatar>
                      </span>
                      <span class="avatarNavbar">
                        <md-avatar
                          class="md-avatar-icon md-sucess"
                        >{{getBusinessScope.name.charAt(0)}}</md-avatar>
                      </span>
                    </div>
                  </div>
                </div>

                <div slot="offline">
                  <div v-if="!getBusinessScope._id">
                    <md-badge
                      class="md-square avatarMobile"
                      md-position="bottom"
                      md-content="OFF"
                      v-if="user.imgUrl"
                    >
                      <md-avatar>
                        <img :src="user.imgUrl" alt="Avatar">
                      </md-avatar>
                    </md-badge>
                    <md-badge
                      v-else
                      class="md-primary md-square"
                      md-position="bottom"
                      md-content="OFF"
                    >
                      <md-avatar class="avatarMobile">
                        <img src="../../../assets/img/profile.png" alt="Avatar">
                      </md-avatar>
                    </md-badge>
                  </div>

                  <div v-else>
                    <div class="avatarContainer">
                      <span class="avatarNavbar demo-badge" v-if="user.imgUrl">
                        <md-badge
                          class="md-primary md-square"
                          md-position="bottom"
                          md-content="OFF"
                        >
                          <md-avatar>
                            <img :src="user.imgUrl">
                          </md-avatar>
                        </md-badge>
                      </span>
                      <span class="avatarNavbar">
                        <md-avatar
                          class="md-avatar-icon md-sucess"
                        >{{getBusinessScope.name.charAt(0)}}</md-avatar>
                      </span>
                    </div>
                  </div>
                </div>
              </offline>
            </router-link>
          </div>

          <md-dialog :md-active.sync="searchPanel">
            <md-dialog-title>
              <small class="left">Busqueda de movimiento</small>
              
              <span class="right" @click="searchBlock">
                <md-icon>close</md-icon>
              </span>
            </md-dialog-title>
            <div class="md-layout">
              <div class="md-layout-item md-size-45 md-small-size-100" style="padding: 0">
                <general-search
                  style="width: 100%;padding: 0 5px;"
                  @clickOnItem="goToMovement"
                  @clickOnCreate="createMovement"
                  :initialValue="''"
                  :itemType="'movements'"
                  :principalAtribute="'name'"
                  :secondaryAtribute="'state'"
                  :optionalMultipleAtribute="''"
                  :placeholder_value="'Movimientos'"
                  :secondaryQuery="{name:'isActive', value:true}"
                ></general-search>
              </div>
            </div>
          </md-dialog>

          <modal v-if="confirmModal">
            <template slot="body">
              <center>
                <p style="color:black;">¿Deseas eliminar este movimiento?</p>
              </center>
            </template>

            <template slot="footer">
              <md-button class="md-simple md-danger" @click="deleteIncome(false)">NO</md-button>
              <md-button class="md-success md-simple" @click="deleteIncome(true)">SI</md-button>
            </template>
          </modal>

          <div class="md-toolbar-section-end">
            <!-- ===================================
OPCIONES DEL NAVBAR
            ===================================-->
            <div v-if="navOptions">
              <span v-for="nav in navOptions" :key="nav._id">
                <router-link :to="{path: nav.isLink.route}" v-if="nav.isLink">
                  <md-button class="md-just-icon md-round md-simple md-white">
                    <md-icon>{{nav.icon}}</md-icon>
                  </md-button>
                </router-link>

                <span v-else>
                  <md-button
                    :class="{'md-just-icon md-round md-simple md-white': true}"
                    @click="call(nav.function)"
                  >
                    <md-icon :class="{'md-big-hide': !nav.desktop}">{{nav.icon}}</md-icon>
                  </md-button>
                </span>
              </span>
            </div>
            <!-- ===================================
OPCIONES DEL NAVBAR
            ===================================-->
            <!-- ===================================
LISTA DE EMPRESAS NAVBAR
            ===================================-->
            <div v-if="isMobile && $route.path == '/user/profile'">
              <div class="md-layout" v-if="getBusiness.docs.length > 0">
                <div
                  class="md-layout-item md-size-50"
                  v-for="company in getBusiness.docs.slice(0, 2)"
                  :key="company._id"
                >
                  <span v-if="($route.path == '/user/profile')" @click="setBusiness(company)">
                    <md-avatar class="md-avatar-icon md-sucess">{{company.name.charAt(0)}}</md-avatar>
                  </span>
                </div>
              </div>
            </div>
            <!-- ===================================
// LISTA DE EMPRESAS NAVBAR
            ===================================-->
          </div>
        </div>
        <div class="md-toolbar-row" v-if="moreOptions">
          <div>
            <br>

            <div class="md-layout">
              <div class="md-layout-item md-size-33" v-for="opt in navSubOptions" :key="opt._id">
                <center>
                  <md-button
                    class="md-just-icon md-round md-simple md-mini md-dense md-white"
                    @click="call(opt.function, opt.params[0]); moreOptions = !moreOptions"
                  >
                    <md-icon>{{opt.icon}}</md-icon>
                  </md-button>
                  <br>
                  <small>{{opt.name}}</small>
                </center>
              </div>
            </div>
          </div>
        </div>
      </md-toolbar>
      <bottomModal
        :config="bottomSheet_config"
        @option_0="sendEmail"
        @option_1="shareInc"
        @option_2="showInvoice"
      ></bottomModal>
      <!-- SE DEBEN DECLARAR FUNCIONES CON NUMERO DE ACUERDO 
    A LA CANTIDAD DE OPCIONES QUE LLEVA EL BOTTOMSHEET, ES DECIR. 
    SI TIENE SOLO DOS OPCIONES, SE DEBE DECLARAR OPTION_0 Y OPTION_1 
    CON SUS RESPECTIVAS FUNCIONES 
    ==============================
    DE IGUAL MANERA EL OBJETO PARAMS DENTRO DE LA CONFIGURACION DEL BOTTOM_SHEET CONTIENE LOS PARAMETROS QUE SE DEBAN INGRESAR EN ESA FUNCION A EJECUTAR
    (CABE DESTACAR QUE TODO VA EN ORDEN DEL INDEX, ASI QUE SE DEBE MANTENER EL ORDEN.)
      -->
    </div>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import swal from 'sweetalert2';
import isMobile from '../../../assets/js/isMobile.js';
import { Modal } from '@/components';
import autocomplete from '../Components/autocomplete/autocomplete';
import generalSearch from '../Components/generalSearch/generalSearch';
import dialogButton from '../../Dashboard/Components/dialogButton';
import bottomModal from '../Components/bottom_modal';
import Push from 'push.js';
import offline from 'v-offline';

export default {
  data() {
    return {
      selectedMovement: [],
      navOptions: [],
      navSubOptions: [],
      moreOptions: false,
      searchPanel: false,
      loading: false,
      loadingInvoice: false,
      confirmModal: false,
      shareSheet: false,
      getBusinessAll: null,
      isMobile: null,
      isOnline: true,

      bottomSheet_config: {
        options: [
          { img: 'email.png', title: 'Correo electronico', params: {} },
          { img: 'others.png', title: 'Otros', params: {} },
          { img: 'dowmload.png', title: 'descargar', params: {} }
        ],
        title: ''
      }
    };
  },

  components: {
    swal,
    autocomplete,
    dialogButton,
    generalSearch,
    Modal,
    bottomModal,
    offline
  },
  methods: {
    call(funct, params) {
      this[funct](params);
    },
    handleConnectivityChange(online) {
      this.isOnline = online;
      if (online == true) {
        Push.create('Bienvenido de vuelta!', {
          body: 'Tu actividad se esta sincronizando en segundo plano!',
          icon: '../../../../public/favicon.png',
          timeout: 99999,
          onClick: function() {
            window.focus();
            this.close();
          }
        });
      } else {
        Push.create('Estas offline!', {
          body:
            'Estas en modo offline, tu actividad sera sincronizada al estar de nuevo online.',
          icon: '../../../../public/favicon.png',
          timeout: 99999,
          onClick: function() {
            window.focus();
            this.close();
          }
        });
      }
    },

    shareInc() {
      if (navigator.share) {
        let typeMovement =
          this.getIncome.responsable.data._id == this.getUser._id
            ? 'outcome'
            : 'income';

        navigator
          .share({
            title: 'Unabase',
            text:
              ('' + this.getIncome.responsable.type
                ? this.getIncome.responsable.data.name
                : this.getIncome.responsable.name) +
              ', te envio una cotización!',
            url: `https://app.unabase.com/movement/` + this.getIncome._id
          })
          .then(() => {
            this.handleBottomModal(false);
            this.$toasted.show('Documento compartido con exito!');
          })
          .catch(error => {
            this.$toasted.show('Error al compartir documento!', {
              type: 'danger'
            });
          });
      }
    },
    shareBottom() {
      if (this.getBottomModalState == true) {
        this.handleBottomModal(false);
      } else {
        this.handleBottomModal(true);
      }
    },

    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },

    sendEmail() {
      if (this.getIncome.lines.length > 0) {
        if (!this.getIncome._id) {
          this.$toasted.show('Debe guardar el movimiento!', { type: 'info' });
        } else {
          this.loading = true;
          if (
            (this.getIncome.type == null ||
              this.getIncome.client.type == undefined) &&
            !this.getIncome.client.type
          ) {
            this.handleOptionalEmail(true);
          } else {
            if (this.loading) {
              this.$toasted.show('Enviando...', { type: 'info' });
            }
            this.$store
              .dispatch('incomes/shareIncome', this.getIncome)
              .then(res => {
                this.loading = false;
                this.$toasted.show('Enviado con exito!');
              });
            this.handleBottomModal(false);
          }
        }
      } else {
        this.$toasted.show('Venta sin productos!', { type: 'danger' });
        this.handleBottomModal(false);
      }
    },

    // shareInvoice() {
    //   if (this.getIncome.lines.length > 0) {
    //     this.loading = true;

    //     swal({
    //       title: '',
    //       text: 'Elige uno de los metodos para enviar tu cotización',
    //       type: 'success',
    //       showCancelButton: true,
    //       confirmButtonText: 'Email',
    //       cancelButtonText: 'Otros',
    //       confirmButtonClass: 'md-button md-success',
    //       cancelButtonClass: 'md-button md-info',
    //       buttonsStyling: false
    //     }).then(result => {
    //       if (result.value) {

    //       } else if (result.dismiss === swal.DismissReason.cancel) {
    //         this.shareInc();
    //       }
    //     });
    //   } else {
    //     this.$notify({
    //       message: 'Datos incompletos',
    //       icon: 'add_alert',
    //       horizontalAlign: 'center',
    //       verticalAlign: 'top',
    //       type: 'warning'
    //     });
    //   }
    // },
    showMore() {
      this.moreOptions = !this.moreOptions;
    },
    deleteIncome(answer) {
      if (answer) {
        this.$store
          .dispatch('incomes/anulateIncome', this.getIncome)
          .then(res => {
            if (res == true) {
              this.$toasted.show('Documento eliminado!');
              this.$router.push('/incomes');
            }
          });
      }
      this.confirmModal = !this.confirmModal;
    },
    goToMovement(item) {
      this.searchBlock();
      this.$router.push('/income/' + item._id);
    },
    createMovement(item) {
      this.searchBlock();
      this.$router.push('/income');
    },

    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    ...mapActions({
      getAllIncomes: 'incomes/getAllIncomes',
      postIncome: 'incomes/postIncome',
      putIncome: 'incomes/putIncome',
      createInvoice: 'incomes/createInvoice',
      postCompany: 'business/postCompany',
      putUser: 'users/putUser',
      putCompany: 'business/putCompany',
      postItem: 'items/postItem',
      putItem: 'items/putItem'
    }),
    ...mapMutations({
      handleBottomNav: 'HIDE_SHOW_BOTTOM',
      handleBottomTotals: 'HIDE_SHOW_TOTALS',
      setIncomeParams: 'SET_INCOMES_PARAMS',
      changeDialogMessage: 'HANDLE_MSG_DIALOG',
      hideShowBottom: 'HIDE_SHOW_BOTTOM',
      handleOptionalEmail: 'HANDLE_OPTIONAL_EMAIL',
      handleBottomModal: 'HANDLE_BOTTOM_MODAL',
      showDetails: 'HANDLE_DETAILS',
      changeBusiness: 'CHANGE_BUSINESS',
      handleItemDialog: 'HANDLE_ITEM_DIALOG'
    }),

    showTotalBar() {
      this.handleBottomTotals(true);
      this.handleBottomNav(false);
      this.$router.push('/income');
    },
    displayDialogMsg(
      dialog = true,
      bottomBar = false,
      inputs = true,
      clean = false
    ) {
      console.log('entroo');
      // if (this.inMobile) {
      this.changeDialogMessage(dialog);
      this.hideShowBottom(bottomBar);
      this.showDetails(inputs);
      // }
    },
    showInvoice() {
      alert('Servicio en construccion');
    },

    filterIncomes(filter) {
      switch (filter) {
        case 'pendings':
          this.setIncomeParams('isActive=true&state=draft');
          break;

        case 'solds':
          this.setIncomeParams('isActive=true&state=sold');
          break;

        case 'anulated':
          this.setIncomeParams('isActive=false');
          break;

        default:
          break;
      }
    },
    searchBlock() {
      this.searchPanel = !this.searchPanel;
      this.handleBottomNav(!this.searchPanel);
    },
    handleMessages() {
      this.changeDialogMessage(true);
    },
    setBusiness(company) {
      console.log(company);
      this.changeBusiness(company);
      this.$toasted.show('<b> ' + this.getBusinessScope.name + '</b> !');
    },

    saveCompany() {
      if (this.getOneCompany._id) {
        this.putCompany(this.getOneCompany).then(res => {
          this.$router.push({ path: '/user/business' });
        });
      } else {
        this.postCompany(this.getOneCompany).then(res => {
          this.$router.push({ path: '/user/business' });
        });
      }
    },
    deleteCompany() {
      let obj = {
        _id: this.getOneCompany._id,
        isActive: false
      };
      this.putCompany(obj).then(res => {
        this.$router.push({ path: '/user/business' });
      });
    },
    createItem() {
      if (this.$route.params.id) {
        this.putItem(this.getItem).then(res => {
          this.$router.push('/items');
          this.$toasted.show('Actualizado con exito!');
        });
      } else {
        this.postItem(this.getItem).then(res => {
          this.$router.push('/items');
          this.$toasted.show('Creado con exito!');
        });
      }
    },
    deleteItem() {
      let obj = { _id: this.getItem._id, isActive: false };
      this.putItem(obj).then(res => {
        this.$router.push('/items');
        this.$toasted.show('Eliminado con exito!');
      });
    },

    saveConfig() {
      this.putUser({ currency: this.getUser.currency, _id: this.getUser._id });
      this.$toasted.show('Actualizacion exitosa!');
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
      getIncomes: 'incomes/getIncomes',
      getIncome: 'incomes/getIncome',
      getUser: 'users/user',
      getContact: 'contacts/getContact',
      getBusiness: 'business/getBusiness',
      getOneCompany: 'business/getOneCompany',
      getBottomModalState: 'getBottomModalState',
      getBusinessScope: 'getBusinessScope',
      getShowDialogIncome: 'getShowDialogIncome',
      getItem: 'items/getItem',
      getCurrency: 'currency/getCurrency'
    }),
    ...mapState({
      showBottom: 'showBottom',
      incomeState: 'incomes/income',
      showNavbar: 'showNavbar',
      showDialogMessage: state => state.showDialogMessage
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
    },

    INCOMES_SIZE() {
      return this.getIncomes.docs.length;
    },
    INCOME() {
      return {
        _id: this.getIncome._id,
        name: this.getIncome.name,
        description: this.getIncome.description,
        dates: {
          expiration: null
        },
        contact: this.getContact != null ? this.getContact._id : null,
        client:
          this.getIncome.client != null
            ? this.getIncome.client.user
              ? this.getIncome.client.user._id
              : this.getIncome.client
            : null,

        creator: this.getIncome.creator,
        responsable: this.getIncome.responsable,

        lines: [],
        total: {
          net: 0,
          tax: 0
        },
        state: 'draft',
        isActive: true,
        currency: null
      };
    }
  },
  created() {},
  mounted() {
    // HANDLE NAVBAR OPTIONS
    this.navOptions = this.$route.meta.navOptions;
    this.navSubOptions = this.$route.meta.navSubOptions;
    if (!this.$route.meta.navSubOptions) this.moreOptions = false;

    this.getBusinessAll = this.getBusiness;
    this.isMobile = isMobile;
  },
  watch: {
    $route: function(to, from, next) {
      console.log(this.$route.meta);
      // HANDLE ROUTE NAVBAR OPTIONS
      this.navOptions = this.$route.meta.navOptions;
      this.navSubOptions = this.$route.meta.navSubOptions;
      if (!this.$route.meta.navSubOptions) this.moreOptions = false;

      // HIDE GENERAL SEARCH IF ROUTES CHANGE
      if (this.searchPanel) {
        this.searchPanel = false;
        this.handleBottomNav(true);
      }
      // HIDE BOTTOMNAV ON ROUTE CHANGE
      this.handleBottomModal(false);

      // HANDLE ITEM DIALOG ON ROUTE CHANGE
      if (this.isMobile) {
        if (this.getShowDialogIncome) {
          //  this.$router.push(from.path);
          //  this.handleItemDialog(false);
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
#mobile_navbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  height: 9%;
  background: rgb(231, 231, 231);
}
#desktop_navbar {
  display: none;
}
@media (min-width: 992px) {
  .avatarMobile {
    display: none;
  }
  .smallScreen-button {
    display: none;
  }
}

.md-menu,
.toggle {
  margin: 0px;
}

#profile_img {
  width: 4%;
  float: left;
  margin-right: -50%;
}

textarea:focus {
  border-bottom: none !important;
  box-shadow: none !important;
}
.topNavbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}

.navbarImg {
  max-width: 36px;
  max-height: 36px;
  border-radius: 50px;
}
ul {
  min-width: 90% !important;
}

.avatarNavbar {
  margin-left: -15px;
  position: relative;
  display: inline-block;
  border: 1px solid #01c73e;
  border-radius: 50%;
  overflow: hidden;
  width: 39px;
  height: 39px;
}
.avatarContainer {
  margin-left: 10px;
  margin-top: 0px;
}

.avatarNavbar img {
  width: 50px;
  height: 50px;
  transform: scale(-1, 1);
}
.md-big-hide {
  display: none;
}
@media (max-width: 618px) {
  .md-big-hide {
    display: block;
  }
}

.demo-badge {
  > div {
    margin-bottom: 16px;
  }
}

.main-toolbar {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
}
</style>
