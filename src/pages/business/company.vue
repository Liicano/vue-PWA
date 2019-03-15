<template>
  <div id="textField">
    <div v-if="loading">
      <spinner></spinner>
    </div>
    <md-content v-else style="max-height: 90vh !important;" id="first">
      <md-content v-if="!isMobile" class="md-elevation-4">
        <slide-y-up-transition :duration="500">
          <div class="md-layout">
            <div class="md-layout-item md-size-80">
              <h1
                class="md-display-1"
              >{{((getOneCompany.name != '')?(getOneCompany.name): 'Nueva empresa') | uppercase}}</h1>

              <small class="md-caption">{{getOneCompany.website}}</small>
            </div>
            <div class="md-layout-item md-size-20">
              <br>
              <div class="file-input img-circle">
                <div class="image-container">
                  <img src="../../assets/img/company_icon.png">
                </div>
              </div>
            </div>
          </div>
        </slide-y-up-transition>
      </md-content>

      <md-content v-else class="md-elevation-4">
        <div class="md-layout">
          <div class="md-layout-item md-size-80">
            <h1
              class="md-title"
              style="color: gray;margin-top: 14px;margin-bottom: 0px;"
            >{{((getOneCompany.name != '')?(getOneCompany.name): 'Nueva empresa') | uppercase}}</h1>

            <small class="md-caption">{{getOneCompany.website}}</small>
          </div>
          <div class="md-layout-item md-size-20" style="margin-top: 15px;">
            <md-avatar>
              <img src="../../assets/img/company_icon.png" alt="Avatar">
            </md-avatar>
          </div>
        </div>
      </md-content>

      <md-divider class="md-inset"></md-divider>

      <br>
      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <md-field>
            <v-text-field
              color="green"
              label="RUT"
              :value="COMPANY.idNumber"
              name="idNumber"
              type="text"
              @input.native="update($event.target)"
              outline
              append-icon="verified_user"
            ></v-text-field>
            <!-- <label>RUT</label>
            <md-input
              :value="COMPANY.idNumber"
              name="idNumber"
              type="text"
              @input.native="update($event.target)"
            ></md-input>-->
          </md-field>
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100">
          <md-field>
            <v-text-field
              outline
              color="green"
              label="Razon social"
              :value="((COMPANY.legalName)?COMPANY.legalName:'')"
              name="legalName"
              type="text"
              @blur="update($event.target)"
            ></v-text-field>
            <!-- <label>Razon social</label>
            <md-input
              :value="((COMPANY.legalName)?COMPANY.legalName:'')"
              name="legalName"
              type="text"
              @blur="update($event.target)"
            ></md-input>-->
          </md-field>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <md-field>
            <v-text-field
              outline
              label="Nombre"
              color="green"
              :value="COMPANY.name"
              name="name"
              type="text"
              append-icon="business"
              @input.native="update($event.target)"
            ></v-text-field>
            <!-- <label>Nombre</label>
            <md-input
              :value="COMPANY.name"
              name="name"
              type="text"
              @input.native="update($event.target)"
            ></md-input>-->
          </md-field>
        </div>

        <div class="md-layout-item md-size-50 md-small-size-100">
          <md-field>
            <v-text-field
              color="green"
              outline
              label="Sitio web"
              name="website"
              :value="COMPANY.website"
              @input.native="update($event.target)"
              append-icon="public"
            ></v-text-field>
            <!-- <label>Sitio web</label>
            <md-input name="website" :value="COMPANY.website" @input.native="update($event.target)"></md-input>
            <md-icon>public</md-icon>-->
          </md-field>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <div class="md-layout">
            <div class="md-layout-item md-size-80">
              <br>
              <span>
                <b>Telefonos de la empresa</b>
              </span>
            </div>
            <div class="md-layout-item md-size-20">
              <span>
                <md-button
                  v-if="addPhone == false"
                  class="md-just-icon md-round md-dense md-success md-simple"
                  style="margin-top: 10px;"
                  @click="addPhone = !addPhone"
                >
                  <md-icon>add</md-icon>
                </md-button>

                <md-button
                  v-else
                  class="md-just-icon md-round md-dense md-success md-simple"
                  style="margin-top: 10px;"
                  @click="addPhone = !addPhone"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </span>
            </div>
          </div>

          <md-list class="md-double-line">
            <md-list-item v-for="(phone, index) in COMPANY.phones" :key="phone._id">
              <div class="md-list-item-text" @click="updatePhone(phone)">
                <div class="row">
                  <div class="col s2">
                    <small>{{index + 1}}</small>
                  </div>
                  <div class="col s10">
                    <span>
                      <b>{{phone.phone}}</b>
                    </span>
                    <br>
                    <span>{{phone.label}}</span>
                  </div>
                </div>
              </div>

              <md-button
                class="md-just-icon md-danger md-round md-mini md-simple"
                @click="delete_phone(phone)"
              >
                <md-icon>close</md-icon>
              </md-button>

              <!-- <md-button
                v-if="index == COMPANY.phones.length - 1"
                class="md-just-icon md-success md-round md-mini md-simple"
              >
                <md-icon>add</md-icon>
              </md-button>-->
            </md-list-item>
          </md-list>
          <slide-y-up-transition :duration="500">
            <div class="md-layout" v-if="addPhone">
              <div class="md-layout-item md-size-50 md-small-size-50" style="padding: 0;">
                <md-field>
                  <label>Telefono</label>
                  <md-input
                    name="phone"
                    :value="phoneState.phone"
                    @input.native="updatePhone($event.target)"
                    type="text"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-30 md-small-size-30" style="padding-left: 5%;">
                <md-field>
                  <label>Etiqueta</label>
                  <md-input
                    name="label"
                    :value="phoneState.label"
                    @input.native="updatePhone($event.target)"
                    @blur="handlePhone()"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-10">
                <md-button class="md-simple md-success md-dense md-mini md-round md-just-icon">
                  <md-icon>add</md-icon>
                </md-button>
              </div>

              <!-- <div class="md-layout-item md-size-20 md-small-size-20 valign-wrapper">
                <md-button
                  v-if="!editing_phone"
                  class="md-success md-round md-mini md-just-icon md-simple"
                  @click="handlePhone()"
                >
                  <md-icon>save</md-icon>
                </md-button>

                <md-button
                  v-if="editing_phone"
                  class="md-success md-round md-mini md-just-icon md-simple"
                  @click="handlePhone()"
                >
                  <md-icon>edit</md-icon>
                </md-button>
              </div>-->
            </div>
          </slide-y-up-transition>
          <md-divider></md-divider>
        </div>

        <div align="rigth" class="md-layout-item md-size-50 md-small-size-100 pull-rigth">
          <div class="md-layout">
            <div class="md-layput-item md-size-80">
              <br>
              <span>
                <b>Emails de la empresa</b>
              </span>
            </div>
            <div class="md-layout-item md-size-20" style="margin-left: 20px;">
              <center>
                <span>
                  <md-button
                    v-if="addEmail == false"
                    class="md-just-icon md-round md-dense md-success md-simple"
                    style="margin-top: 10px;"
                    @click="addEmail = !addEmail"
                  >
                    <md-icon>add</md-icon>
                  </md-button>

                  <md-button
                    v-else
                    class="md-just-icon md-round md-dense md-success md-simple"
                    style="margin-top: 10px;"
                    @click="addEmail = !addEmail"
                  >
                    <md-icon>close</md-icon>
                  </md-button>
                </span>
              </center>
            </div>
          </div>

          <md-list class="md-double-line">
            <md-list-item v-for="email in COMPANY.emails" :key="email._id">
              <div class="md-list-item-text" @click="updateEmail(email)">
                <span>
                  <b class="text-gray darken-1">{{email.email}}</b>
                </span>
                <span>{{email.label}}</span>
              </div>

              <md-button
                class="md-just-icon md-danger md-round md-mini md-simple"
                @click="delete_email(email)"
              >
                <md-icon>close</md-icon>
              </md-button>
            </md-list-item>
          </md-list>

          <slide-y-up-transition :duration="500">
            <div class="md-layout" v-if="addEmail">
              <div class="md-layout-item md-size-50 md-small-size-50" style="padding: 0;">
                <md-field>
                  <label>Email</label>
                  <md-input
                    name="email"
                    :value="mailState.email"
                    @input.native="updateEmail($event.target)"
                    type="text"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-40 md-small-size-40" style="padding-left: 5%;">
                <md-field>
                  <label>Etiqueta</label>
                  <md-input
                    name="label"
                    :value="mailState.label"
                    @input.native="updateEmail($event.target)"
                    @blur="handleMail()"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-10">
                <md-button class="md-simple md-success md-dense md-mini md-round md-just-icon">
                  <md-icon>add</md-icon>
                </md-button>
              </div>

              <!-- <div class="md-layout-item md-size-20 md-small-size-20 valign-wrapper">
                <md-button
                  class="md-success md-round md-mini md-just-icon md-simple"
                  @click="handleMail()"
                >
                  <md-icon>save</md-icon>
                </md-button>
              </div>-->
            </div>
          </slide-y-up-transition>
          <md-divider></md-divider>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-size-100 md-small-size-100">
          <div class="md-layout">
            <div class="md-layput-item md-size-80">
              <br>
              <span>
                <b>Direccion de la empresa</b>
              </span>
            </div>
            <div class="md-layout-item md-size-20">
              <span>
                <md-button
                  v-if="addAddress == false"
                  class="md-just-icon md-round md-dense md-success md-simple"
                  style="margin-top: 10px;"
                  @click="addAddress = !addAddress"
                >
                  <md-icon>add</md-icon>
                </md-button>

                <md-button
                  v-else
                  class="md-just-icon md-round md-dense md-danger md-simple"
                  style="margin-top: 10px;"
                  @click="addAddress = !addAddress"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </span>
            </div>
          </div>

          <slide-y-up-transition :duration="500">
            <div class="md-layout" v-if="addAddress">
              <div class="md-layout-item md-size-100 md-small-size-100">
                <div class="container-fluid">
                  <googleMaps
                    :initial="getOneCompany.address.text"
                    :res_name="'address'"
                    :res_second_level="'text'"
                    @setAddress="update"
                  ></googleMaps>
                </div>
              </div>
              <!-- <div
                class="md-layout-item md-size-50 md-small-size-100"
              ></div>-->
            </div>
          </slide-y-up-transition>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-size-100" style="padding:0">
          <v-list two-line>
            <v-subheader>Usuarios de la empresa</v-subheader>
            <template v-for="(user, index) in getOneCompany.users">
              <v-divider :inset="true" :key="index"></v-divider>
              <v-list-tile avatar :key="user.user.imgUrl">
                <v-list-tile-avatar>
                  <img :src="user.user.imgUrl">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="user.user.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="'<b>'+user.description+'</b>'"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </div>
      </div>
      <br>

      <br>
      <br>
    </md-content>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import store from '../../store/store.js';
import isMobile from '../../assets/js/isMobile.js';
import scrollBtn from '../Dashboard/Components/scrollerBtn';
import { SlideYUpTransition } from 'vue2-transitions';
import spinner from '../Dashboard/Components/spinner';
import googleMaps from '../../pages/Dashboard/Maps/GoogleMaps';

export default {
  name: 'Business',
  data: () => ({
    editing_phone: false,
    editing_mail: false,
    select: [],
    isMobile: isMobile,
    addPhone: false,
    addEmail: false,
    loading: true,
    addAddress: true,
    show: false,

    items: [
      { header: 'Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      }
    ]
  }),
  components: {
    scrollBtn,
    SlideYUpTransition,
    spinner,
    googleMaps
  },
  methods: {
    ...mapActions({
      getCompany: 'business/getCompany',
      postCompany: 'business/postCompany'
    }),
    ...mapMutations({
      cleanCompany: 'business/CLEAN_COMPANY',
      setCompany: 'business/SET_COMPANY',
      pushPhone: 'business/ADD_PHONE',
      deletePhone: 'business/DELETE_PHONE',
      upPhone: 'business/UPDATE_PHONE',
      upMail: 'business/UPDATE_EMAIL',
      pushMail: 'business/ADD_EMAIL',
      deleteMail: 'business/DELETE_EMAIL',
      setAddres: 'business/SET_ADDRESS',
      addObject: 'business/ADD_OBJECT'
    }),

    // GENERAL FUNCTIONS
    update(event) {
      if (event.second_level) {
        this.setCompany({
          attr: event.name,
          second_level: event.second_level,
          value: event.value
        });
      } else {
        this.setCompany({ attr: event.name, value: event.value });
      }
    },
    // PHONES FUNCTIONS
    handlePhone() {
      if (!this.editing_phone) {
        this.pushPhone({
          phone: this.phoneState.phone,
          label: this.phoneState.label
        });
        this.upPhone({ phone: '', label: '' });
      } else {
        this.upPhone({ phone: '', label: '' });
        this.editing_phone = false;
      }
      this.addPhone = false;
    },
    delete_phone(phone) {
      this.deletePhone(phone);
    },
    updatePhone(event) {
      this.addPhone = true;
      if (event.name) {
        this.upPhone({ attr: event.name, value: event.value });
      } else {
        this.editing_phone = true;
        this.upPhone(event);
      }
    },

    // EMAIL FUNCTIONS
    updateEmail(event) {
      if (event.name) {
        this.upMail({ attr: event.name, value: event.value });
      } else {
        this.editing_mail = true;
        this.upMail(event);
      }
    },
    handleMail() {
      if (!this.editing_mail) {
        this.pushMail({
          email: this.mailState.email,
          label: this.mailState.label
        });
        this.upMail({ email: '', label: '' });
      } else {
        this.upMail({ email: '', label: '' });
        this.editing_mail = false;
      }
      this.addEmail = false;
    },
    delete_email(email) {
      this.deleteMail(email);
    },
    update_address(event) {
      this.setAddres({ attr: event.name, value: event.value });
    },

    handleObject(event) {
      this.addObject({
        attr: event.name,
        name: event.value,
        number: null
      });
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getCompany(this.$route.params.id).then(res => {
        this.loading = false;
        this.addAddress = true;
      });
    } else {
      this.loading = false;
      this.cleanCompany();
    }
  },

  computed: {
    COMPANY() {
      return {
        idNumber: this.getOneCompany.idNumber,
        name: this.getOneCompany.name,
        legalName: this.getOneCompany.legalName,
        website: this.getOneCompany.website,
        businessType: this.getOneCompany.businessType,
        emails: this.getOneCompany.emails,
        phones: this.getOneCompany.phones,
        address: this.getOneCompany.address
      };
    },
    ...mapGetters({
      getOneCompany: 'business/getOneCompany'
    }),
    ...mapState({
      phoneState: state => state.business.phone,
      mailState: state => state.business.email
    })
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

<style lang="scss" scoped>
</style>