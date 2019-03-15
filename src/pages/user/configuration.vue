<template>
  <div id="textField">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <v-list three-line subheader>
          <v-subheader>Moneda</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <center>
                <v-select
                  v-model="select"
                  name="currency"
                  @change="changeCurrency($event)"
                  :hint="`${select.name}, ${select.prefix}`"
                  :items="getCurrencies.docs"
                  item-text="name"
                  item-value="prefix"
                  label="Seleccione moneda"
                  persistent-hint
                  return-object
                  single-line
                  append-icon="monetization_on"
                  color="green"
                ></v-select>
              </center>
            </v-list-tile-content>
          </v-list-tile>
          <!-- <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>-->
        </v-list>
        <v-divider></v-divider>
        <!-- <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Auto-add widgets</v-list-tile-title>
              <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>-->
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../store/store.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      select: {}
    };
  },

  created() {
    this.getAllCurrencies();
  },
  mounted() {
    this.select = this.getUser.currency ? this.getUser.currency : {};
  },
  methods: {
    ...mapMutations({
      setCurrency: 'currency/SET_CURRENCY',
      setUser: 'users/setUser'
    }),
    ...mapActions({
      getAllCurrencies: 'currency/getAllCurrencies'
    }),
    changeCurrency(event) {
      let name = 'currency';
      let obj = {
        isObject: true,
        attr: name,
        value: event
      };
      this.setUser(obj);
    }
  },
  computed: {
    ...mapGetters({
      getCurrencies: 'currency/getCurrencies',
      getUser: 'users/user'
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
<style>
</style>
