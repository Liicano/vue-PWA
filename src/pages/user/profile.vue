<template>
  <div id="textField">
    <br>
    <!-- MOBILE -->
    <div class="container-fluid" v-if="isMobileLocal">
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <center>
            <div class="file-input img-circle" v-if="!getBusinessScope._id">
              <div class="image-container" v-if="!user.image">
                <img :src="USER.image">
              </div>
              <div class="image-container" v-else>
                <img src="../../../public/img/logotipo60x60.png">
              </div>
              <div class="button-container">
                <md-button class="md-success md-round md-fileinput md-dense md-mini">
                  <template>Cambiar</template>
                  <input type="file" name="circle" @change="onFileChange">
                </md-button>
              </div>
            </div>

            <div v-else class="file-input img-circle">
              <div class="avatarContainer">
                <span class="avatarNavbar" v-if="user.imgUrl">
                  <md-avatar>
                    <img :src="user.imgUrl">
                  </md-avatar>
                </span>
                <span class="avatarNavbar">
                  <md-avatar class="md-avatar-icon md-sucess">{{getBusinessScope.name.charAt(0)}}</md-avatar>
                </span>
              </div>

              <div class="button-container">
                <md-button
                  class="md-success md-round md-mini md-dense"
                  @click="clean_businessScope()"
                >
                  <template>Volver a mi unabase</template>
                </md-button>
              </div>
            </div>
          </center>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-small-size-80">
          <md-field>
            <v-text-field
              color="green"
              label="Nombre completo"
              name="name"
              id="name"
              :value="USER.name"
              @input.native="update($event.target)"
              outline
            ></v-text-field>
          </md-field>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <v-text-field
              color="green"
              label="Nombre de usuario"
              id="username"
              name="username"
              :value="USER.username"
              @input.native="update($event.target)"
              append-icon="account_circle"
              outline
            ></v-text-field>
          </md-field>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <v-text-field
              outline
              label="Email"
              color="green"
              name="email"
              id="email"
              :value="USER.email"
              @input.native="update($event.target)"
              append-icon="email"
            ></v-text-field>
          </md-field>
        </div>
      </div>

      <!-- <div class="md-layout">
        <div class="md-layout-item md-small-size-100" style="padding:0;">
          <md-card style="width: 95%;">
            <md-card-expand style="padding:0;">
              <md-card-actions md-alignment="space-between">
                <h5 style="margin-left: 5%;">Mi direccion</h5>
                <md-card-expand-trigger>
                  <md-button class="md-icon-button md-success" style="margin-right: 5%;">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <md-card-content>
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="first-name">Pais</label>
                        <md-input
                          name="country"
                          id="country"
                          :value="USER.address.country"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>
                  </div>

                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="first-name">Ciudad</label>
                        <md-input
                          name="city"
                          id="city"
                          :value="USER.address.city"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>
                  </div>

                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="first-name">Region</label>
                        <md-input
                          name="region"
                          id="region"
                          :value="USER.address.region"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>
                  </div>

                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="first-name">Distrito</label>
                        <md-input
                          name="district"
                          id="district"
                          :value="USER.address.district"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>
                  </div>

                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-65">
                      <md-field>
                        <label for="first-name">Calle</label>
                        <md-input
                          name="street"
                          id="street"
                          :value="USER.address.street"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-35">
                      <md-field>
                        <label for="first-name">Casa</label>
                        <md-input
                          name="house"
                          id="house"
                          :value="USER.address.number"
                          @input.native="update($event.target)"
                        />
                      </md-field>
                    </div>
                  </div>
                </md-card-content>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>
        </div>
      </div>-->
      <v-subheader>Opciones</v-subheader>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <div class="row">
            <div class="col s3">
              <center>
                <md-button class="md-success md-just-icon md-round" @click="saveProfile()">
                  <md-icon>save</md-icon>
                </md-button>
                <br>
                <small>Guardar</small>
              </center>
            </div>
            <div class="col s3">
              <center>
                <router-link
                  class="md-info md-just-icon md-round"
                  tag="md-button"
                  to="/user/business"
                >
                  <md-icon>business_center</md-icon>
                </router-link>
                <br>
                <small>Empresas</small>
              </center>
            </div>
            <div class="col s3">
              <center>
                <router-link
                  class="gray darken-4 md-just-icon md-round"
                  tag="md-button"
                  to="/user/config"
                >
                  <md-icon>settings</md-icon>
                </router-link>
                <br>
                <small>Configuracion</small>
              </center>
            </div>

            <div class="col s3">
              <center>
                <md-button class="md-danger md-just-icon md-round" @click="close_session">
                  <md-icon>exit_to_app</md-icon>
                </md-button>
                <br>
                <small>Cerrar sesion</small>
              </center>
            </div>
          </div>
        </div>
      </div>

      <br>
    </div>

    <!-- DESKTOP -->
    <div v-else>
      <br>
      <br>
      <div class="row">
        <div class="col s4">
          <md-card>
            <md-card-header class="md-card-header-icon">
              <div class="card-icon">
                <md-icon>map</md-icon>
              </div>
              <h4>Direccion</h4>
            </md-card-header>
            <br>
            <md-divider class="md-inset"></md-divider>

            <md-card-content>
              <div class="row">
                <div class="col s12">
                  <md-field>
                    <label>Pais</label>
                    <md-input type="text" v-model="USER.address.country"></md-input>
                  </md-field>
                </div>

                <div class="col s12">
                  <md-field>
                    <label>Region</label>
                    <md-input type="text" v-model="USER.address.region"></md-input>
                  </md-field>
                </div>

                <div class="col s12">
                  <md-field>
                    <label>Ciudad</label>
                    <md-input type="text" v-model="USER.address.city"></md-input>
                  </md-field>
                </div>

                <div class="col s12">
                  <md-field>
                    <label>Distrito</label>
                    <md-input type="text" v-model="USER.address.distric"></md-input>
                  </md-field>
                </div>

                <div class="col s12">
                  <div class="row">
                    <div class="col s8">
                      <md-field>
                        <label>Calle</label>
                        <md-input type="text" v-model="USER.address.street"></md-input>
                      </md-field>
                    </div>

                    <div class="col s4">
                      <md-field>
                        <label>Casa</label>
                        <md-input type="text" v-model="USER.address.number"></md-input>
                      </md-field>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="col s4">
          <md-card class="md-card-profile">
            <!-- <div class="md-card-avatar" style="max-height: 96px !important;">
              <img class :src="USER.image">
            </div>-->
            <center>
              <div
                class="file-input img-circle"
                v-if="!getBusinessScope._id"
                style="margin-top: -50px;"
              >
                <div class="image-container" v-if="!user.image">
                  <img :src="USER.image">
                </div>
                <div class="image-container" v-else>
                  <img src="../../../public/img/logotipo60x60.png">
                </div>
                <div class="button-container">
                  <md-button class="md-success md-round md-fileinput md-dense md-mini">
                    <template>Cambiar</template>
                    <input type="file" name="circle" @change="onFileChange">
                  </md-button>
                </div>
              </div>

              <div v-else class="file-input img-circle">
                <div class="avatarContainer">
                  <span class="avatarNavbar" v-if="user.imgUrl">
                    <md-avatar>
                      <img :src="user.imgUrl">
                    </md-avatar>
                  </span>
                  <span class="avatarNavbar">
                    <md-avatar class="md-avatar-icon md-sucess">{{getBusinessScope.name.charAt(0)}}</md-avatar>
                  </span>

                  <!-- Variable amount more avatarContainer -->
                </div>

                <div class="button-container">
                  <md-button
                    class="md-success md-round md-mini md-dense"
                    @click="clean_businessScope()"
                  >
                    <template>Volver a mi unabase</template>
                  </md-button>
                </div>
              </div>
            </center>

            <md-card-content>
              <h6 class="category text-gray">{{USER.idNumber}}</h6>
              <h4 class="card-title" style="margin-top: -1px;">{{USER.name}}</h4>
              <div class="card-description">
                <div class="row">
                  <div class="col s8">
                    <md-field>
                      <label>Nombre de usuario</label>
                      <md-input type="text" v-model="USER.username"></md-input>
                    </md-field>
                  </div>
                  <div class="col s4 valign-wrapper" style="color:green;">
                    <p>Disponible</p>
                  </div>
                </div>

                <div class="row" style="margin-top: -20%;">
                  <div class="col s12">
                    <md-field>
                      <label>Documento de identidad</label>
                      <md-input type="text" v-model="USER.idNumber"></md-input>
                    </md-field>
                  </div>

                  <div class="col s12">
                    <md-field>
                      <label>Nombre</label>
                      <md-input type="text" v-model="USER.name"></md-input>
                    </md-field>
                  </div>

                  <div class="col s12">
                    <md-field>
                      <label>Password</label>
                      <md-input type="text" v-model="USER.password"></md-input>
                    </md-field>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <center>
                    <md-button class="md-success md-just-icon md-round" @click="saveProfile()">
                      <md-icon>save</md-icon>
                    </md-button>
                    <br>
                    <small>Guardar</small>
                  </center>
                </div>

                <div class="col s6">
                  <center>
                    <router-link to="/user/business">
                      <md-button class="md-info md-just-icon md-round">
                        <md-icon>business_center</md-icon>
                      </md-button>
                    </router-link>
                    <br>
                    <small>Empresas</small>
                  </center>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>

        <div class="col s4">
          <div class="row">
            <div class="col s12">
              <md-card>
                <md-card-header class="md-card-header-icon">
                  <div class="card-icon">
                    <md-icon>email</md-icon>
                  </div>
                  <h4 class="title">Correos</h4>
                  <md-button
                    class="pull-right md-info md-mini md-dense md-just-icon md-round"
                    v-if="!editEMail"
                    @click="editEMail = !editEMail"
                  >
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button
                    class="pull-right md-success md-mini md-dense md-just-icon md-round"
                    v-else
                    @click="editEMail = !editEMail"
                  >
                    <md-icon>add</md-icon>
                  </md-button>
                </md-card-header>
                <br>
                <md-divider class="md-inset"></md-divider>
                <md-card-content>
                  <br>

                  <div v-if="(USER.email)">
                    <div class="row" style="cursor:pointer;">
                      <div
                        class="col s10"
                        style="overflow: hidden;"
                        @click="showButton = !showButton"
                      >
                        <div class="row">
                          <div class="col s12">
                            <input type="text" :value="USER.email">
                          </div>
                          <!-- <div class="col s4">
                            <input type="text" v-value="'index'">
                          </div>-->
                        </div>
                      </div>
                      <div class="col s2">
                        <button
                          class="btn-floating red btn-mini btn-small valig-wrapper"
                          v-if="showButton"
                        >
                          <i class="material-icons">delete</i>
                        </button>
                        <br>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-else>
                    <div class="row" style="cursor:pointer;">
                      <div class="col s12">
                        <h5>{{USER.email}}</h5>
                        <small>Google</small>
                      </div>
                    </div>
                  </div>-->
                </md-card-content>
              </md-card>
            </div>
          </div>

          <div class="row">
            <div class="col s12">
              <md-card>
                <md-card-header class="md-card-header-icon">
                  <div class="card-icon">
                    <md-icon>phone</md-icon>
                  </div>
                  <h4 class="title">Telefonos</h4>
                  <md-button class="pull-right md-success md-mini md-dense md-just-icon md-round">
                    <md-icon>edit</md-icon>
                  </md-button>
                </md-card-header>
                <br>
                <md-divider class="md-inset"></md-divider>
                <br>
                <md-card-content>
                  <div v-if="(USER.phone)">
                    <div class="row" style="cursor:pointer;" v-if="USER.phone">
                      <div class="col s10" @click="showButton = !showButton">
                        <h5>{{USER.phone}}</h5>
                      </div>
                      <div class="col s2">
                        <button
                          class="btn-floating red btn-mini btn-small valig-wrapper"
                          v-if="showButton"
                        >
                          <i class="material-icons">delete</i>
                        </button>
                        <br>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div class="row" style="cursor:pointer;">
                      <div class="col s10">
                        <center>
                          <small>No hay telefonos registrados</small>
                        </center>
                      </div>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from '@/pages';
import store from '../../store/store.js';

import { Modal } from '@/components';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import isMobile from '../../assets/js/isMobile';

export default {
  components: {
    EditProfileForm,
    UserCard,
    Modal
  },
  name: 'userProfile',
  props: {},
  data() {
    return {
      newEmail: '',
      imageCircle: '',
      userData: {},
      isMobileLocal: false,
      showButton: false,
      editEMail: false,
      editPhone: false
    };
  },
  methods: {
    ...mapActions({
      logout: 'users/logout',
      putUser: 'users/putUser'
    }),
    ...mapMutations({
      setUser: 'users/setUser',
      changeBusiness: 'CHANGE_BUSINESS',
      hideShowBottom: 'HIDE_SHOW_BOTTOM'
    }),

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (e.target.name) {
        this.createImage(files[0], 'circle');
        this.USER.image = {
          name: files[0].name,
          size: files[0].size,
          type: files[0].type
        };
      } else {
        this.createImage(files[0]);
      }
    },
    createImage(file, type) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = e => {
        if (type === 'circle') {
          vm.imageCircle = e.target.result;
        } else {
          vm.imageRegular = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    },

    update(event) {
      let obj = {
        attr: event.name,
        value: event.value
      };
      this.setUser(obj);
    },

    saveProfile() {
      this.putUser(this.user);
    },
    close_session() {
      this.logout().then(res => {
        this.$router.go('/dashboard');
      });
    },

    clean_businessScope() {
      this.changeBusiness({});
      this.$toasted.show('<b>' + this.user.name + '</b>');
    }
  },

  created() {
    console.log(this.USER);
    console.log(this.user);
    this.isMobileLocal = isMobile;
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
      getBusinessScope: 'getBusinessScope'
    }),

    USER() {
      return {
        name: this.user.name,
        username: this.user.username,
        idNumber: this.user.idNumber ? this.user.idNumber : 'N/A',
        password: this.user.password ? this.user.password : 'N/A',
        image: this.user.imgUrl,
        email: this.user.google
          ? this.user.google.email
          : this.user.emails
          ? this.user.emails[0].email
          : 'NO EMAIL',
        // address: {
        //   street: this.user.address.street ? this.user.street : 'N/A',
        //   number: this.user.address.number ? this.user.number : 'N/A',
        //   district: this.user.address.district ? this.user.district : 'N/A',
        //   city: this.user.address.city ? this.user.city : 'N/A',
        //   region: this.user.address.region ? this.user.region : 'N/A',
        //   country: this.user.address.country ? this.user.country : 'N/A'
        // },
        phones: this.user.phones[0] ? this.user.phones[0] : 'N/A'
      };
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
.card-expansion {
  height: 480px;
}

/* .md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
} */
.text-right {
  display: flex;
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
</style>
