<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <md-field class="md-form-group mdl-typography--text-center" slot="title">
          <div class="row">
            <img src="../../assets/img/logo_transparente.png" alt>
          </div>
        </md-field>

        <center slot="inputs">
          <md-field class="md-form-group">
            <md-input type="password" v-model="password1" :placeholder="lg.user.password"></md-input>
          </md-field>
          <md-field class="md-form-group">
            <md-input type="password" v-model="password2" :placeholder="lg.user.passwordConfirm"></md-input>
          </md-field>
          <md-button
            slot="footer"
            class="md-simple md-success md-lg"
            @click="restart"
          >{{ lg.user.changePassword }}</md-button>
        </center>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from '@/components';
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
import notify from '../../assets/js/notify.js';
import lang from '../../languages';
// import Notifications from '../../../components/NotificationPlugin';
// import api from '../../../config/api';

// Vue.use(Notifications);
// import axios from 'axios'
export default {
  name: 'Restart',
  components: {
    LoginCard
  },
  data() {
    return {
      id: null,
      password1: null,
      password2: null
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      setPassword: 'users/setPassword'
    }),
    restart() {
      this.setPassword({
        password: this.password1,
        newPassword: this.password2,
        id: this.id
      })
        .then(res => {
          this.$router.push('/');
        })
        .catch(err => {
          this.$toasted.show('' + lang.user.restartPasswordFail + '');
        });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
  }
};
</script>

<style>
.page-header.header-filter.restart-page {
  background-image: url('../../../public/img/restart.jpg') !important;
}
</style>