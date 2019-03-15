<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100" style="padding:0">
        <v-card class="mx-auto" color="#01C73E" dark max-width="400">
          <!-- <v-card-title>
            <center>
            
            </center>
          </v-card-title>-->
          <v-card-actions>
            <v-list-tile class="grow" v-if="user != null">
              <v-list-tile-avatar color="grey darken-3" v-if="user.data.imgUrl">
                <v-img class="elevation-6" :src="user.data.imgUrl"></v-img>
              </v-list-tile-avatar>
              <v-list-tile-avatar color="grey darken-3" v-else>
                <v-img class="elevation-6" :src="getImg()"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <div class="md-layout">
                  <div class="md-layout-item md-size-70">
                    <h6>{{movement.name}}</h6>

                    <h6>
                      <i>{{user.data.name}}</i>
                    </h6>
                  </div>

                  <!-- <div class="md-layout-item md-size-10">
                    <md-button class="md-just-icon md-round md-mini md-white md-simple">
                      <md-icon>account_box</md-icon>
                    </md-button>
                  </div>-->
                </div>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-small-size-100" style="padding:0;">
        <!-- ==============================
              LISTA DE ITEMS Y TOTALES (MOBILE)
        ==============================-->
        <item-list :items="items"></item-list>
        <!-- ==============================
            //  LISTA DE ITEMS Y TOTALES (MOBILE)
        ==============================-->
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-small-size-100" style="padding:0;">
        <totales></totales>
      </div>
    </div>

    <v-snackbar
      v-model="active"
      color="green"
      :multi-line="false"
      :timeout="4000"
      :vertical="false"
    >
      <b>Registrate aqui</b>
      <v-btn dark flat @click="goToRegister()">Registrar</v-btn>
    </v-snackbar>

    <!-- <v-dialog v-model="active" max-width="290">
      <v-card>
        <v-card-title class="headline">¿No estas registrado?</v-card-title>

        <v-card-text>
          Descubre todo lo que unabase tiene para ofrecerte, solo presiona el boton
          <span
            style="color: green"
          >
            <b>REGISTRAR</b>
          </span> de aca abajo.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="yellow darken-1" flat="flat" @click="active = false">Continuar</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="goToRegister()">Registrarme</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

import totales from '../../pages/Dashboard/Components/mobile_total';
import itemList from '../../pages/incomes/components/income_list';

export default {
  data() {
    return {
      showSnackbar: null,
      items: null,
      user: null,
      movement: null,
      active: true
    };
  },

  components: {
    totales,
    itemList
  },

  created() {
    this.getCurrentIncome(this.$route.params.id).then(res => {
      this.showUser(res);
      this.movement = res;
    });
  },

  methods: {
    ...mapActions({
      getCurrentIncome: 'incomes/getIncome'
    }),

    showUser(income) {
      if (income.client.type != 'User') {
        this.user = income.responsable;
      } else {
        this.user = income.client;
      }
    },
    goToRegister() {
      window.location.href = 'https://app.unabase.com';
    },
    getImg() {
      return require('../../assets/img/company_icon.png');
    }
  },

  computed: {
    ...mapGetters({
      getIncome: 'incomes/getIncome'
    }),

    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' };
        case 'two':
          return { class: 'red', icon: 'edit' };
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' };
        default:
          return {};
      }
    }
  }
};
</script>
<style>
</style>

