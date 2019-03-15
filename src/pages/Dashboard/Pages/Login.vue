<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <md-field class="md-form-group mdl-typography--text-center" slot="title">
          <div class="row">
            <img src="../../../assets/img/logo_transparente.png" alt>
          </div>
        </md-field>

        <p slot="description" class="description">Ingresa con google</p>

        <md-button slot="inputs" class="md-simple google" style="margin-top: -7%;">
          <Gauth class from="login"></Gauth>
        </md-button>

        <p slot="inputs" class="description">{{lg.base.or}}</p>

        <md-button
          slot="inputs"
          v-if="!local"
          class="md-simple md-info"
          md-alignment="space-between"
          @click="toggleLocal"
        >{{ lg.user.loginEmail }}</md-button>
        <div slot="inputs" v-if="local">
          <md-field class="md-form-group" slot="inputs">
            <md-icon>email</md-icon>
            <label>{{ lg.user.email }} / {{ lg.user.username }}</label>
            <md-input v-validate="'required'" v-model="email" type="email" name="email"></md-input>
          </md-field>
          <span class="text-danger">{{ errors.first('email') }}</span>
          <md-icon v-if="errors.first('email')" class="left text-danger">warning</md-icon>
          <md-field class="md-form-group" slot="inputs">
            <md-icon>lock_outline</md-icon>
            <label>{{ lg.user.password }}</label>
            <md-input v-validate="'required|min:8'" type="password" name="pass" v-model="password"></md-input>
          </md-field>
          <span class="text-danger">{{ errors.first('pass') }}</span>
          <md-icon v-if="errors.first('pass')" class="left text-danger">warning</md-icon>
          <center>
            <md-button
              slot="footer"
              class="md-simple md-success md-lg"
              @click="login"
            >{{ lg.user.loginGo }}</md-button>
            <md-button
              slot="footer"
              class="md-simple md-success md-lg"
              @click="restart"
            >{{ lg.user.restartPassword }}</md-button>
          </center>
        </div>

        <center slot="inputs">
          <md-button
            class="md-simple md-info md-sm"
            md-alignment="space-between"
            to="/register"
          >{{ lg.user.noAccount }}</md-button>
        </center>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
import spinner from '../Components/spinner';
// import Notifications from '../../../components/NotificationPlugin';
import api from '../../../lib/api';
import Gauth from '../../../components/Gauth';

import bool from 'normalize-bool';
import lang from '../../../languages';
// Vue.use(Notifications);
// import axios from 'axios'
export default {
  components: {
    LoginCard,
    Gauth,
    spinner
  },
  data() {
    return {
      user: null,
      firstname: null,
      email: null,
      password: null,
      loading: false,
      url: {
        google: api + '/auth/login'
      },
      local: false
    };
  },
  computed: {
    ...mapGetters([
      // eslint-disable-next-line
      'getUrls'
    ])
  },
  methods: {
    login() {
      if (this.email != null && this.password != null) {
        if (this.errors.items.length > 0) {
          this.$toasted.show('Uno o mas campos erroneos!', { type: 'danger' });
        } else {
          console.log('LOGEANDO...');
          this.$store
            .dispatch('users/login', {
              username: this.email,
              password: this.password
            })
            // eslint-disable-next-line
            .then(res => {
              console.log('LOGEADO...');

              this.$router.push('/');
            })
            .catch(err => {
              //err.status  & err.statusText
              let type = new Map();
              type.set(403, 'warning');
              type.set(404, 'danger');
              type.set(401, 'warning');
              console.log('err');
              console.log(err);
              this.$toasted.show(err.data.err, { type: type.get(err.status) });
              this.$toasted.show(err.statusText, {
                type: type.get(err.status)
              });
            });
        }
      } else {
        this.$toasted.show('Uno o mas campos vacios!', { type: 'danger' });
      }
    },

    restart() {
      if (this.email !== null && this.email !== '') {
        this.restartPassword(this.email)
          .then(res => {
            this.$toasted.show(lang.user.restartPasswordSuccess);
          })
          .catch(err => {
            this.$toasted.show(lang.user.restartPasswordFail, {
              type: 'danger'
            });
          });
      } else {
        this.$toasted.show(lang.user.restartNoEmail, { type: 'info' });
      }
    },
    ...mapActions({
      verify: 'users/verify',
      restartPassword: 'users/restart'
    }),
    toggleLocal() {
      this.local = !this.local;
    }
  },
  mounted() {
    let router = this.$router;
    if (bool(this.$route.query.verifyAccount)) {
      this.verify({
        hash: this.$route.query.hash,
        id: this.$route.query.id
      })
        .then(res => {
          this.$toasted.show(res.message);

          router.push('/');
        })
        .catch(err => {
          this.$toasted.show(err.message, { type: 'danger' });
        });
    }
  }
};
</script>

<style scoped>
.google {
  display: block;
  text-align: center;
  margin: auto;
}
.title {
  color: black;
}
.row {
  margin: auto;
}
</style>