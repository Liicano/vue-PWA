<template>
  <md-content class="md-elevation-8" v-if="!this.$route.meta.hideBottomBar">
    <!-- BOTTOM NAVBAR -->
    <div class="container-fluid">
      <v-bottom-nav
        fixed
        app
        mandatory
        :value="getBottomState"
        color="white"
        id="bottom_navbar"
        v-if="(this.$route.path != '/login') && (this.$route.path != '/register')"
      >
        <router-link to="/dashboard">
          <v-btn :ripple="false" flat color="green">
            <span>Inicio</span>
            <v-icon>home</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/outcomes">
          <v-btn :ripple="false" flat color="green">
            <span>Gastos</span>
            <v-icon>local_mall</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/incomes">
          <v-btn :ripple="false" flat color="green">
            <span>Ventas</span>
            <v-icon>monetization_on</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/menu">
          <v-btn :ripple="false" flat color="green">
            <span>Otros</span>
            <v-icon>menu</v-icon>
          </v-btn>
        </router-link>
      </v-bottom-nav>
      <!-- <md-bottom-bar md-sync-route>
          <div class="md-layout">
            <div class="md-layout-item md-size-20" style="padding: 0;">
              <center>
                <md-bottom-bar-item
                  style="background-color: #01C73E !important; width: 100%;"
                  to="/"
                  :md-label="`${lg.modules.message}`"
                  md-icon="message"
                ></md-bottom-bar-item>
              </center>
            </div>

            <div class="md-layout-item md-size-20" style="padding: 0;">
              <center>
                <md-bottom-bar-item
                  style="background-color: #01C73E !important;width: 100%;"
                  to="/outcomes"
                  :md-label="`${lg.modules.outcome}`"
                  md-icon="local_mall"
                ></md-bottom-bar-item>
              </center>
            </div>

            <div class="md-layout-item md-size-20" style="padding:0;">
              <center>
                <md-bottom-bar-item
                  style="background-color: #01C73E !important;width: 100%;"
                  to="/dashboard"
                >
                  <a
                    class="btn-floating btn-large waves-effect waves-light"
                    href="/dashboard"
                    style="background-color: #FFFFFF !important;position: fixed; left: 45%; bottom: 3%; border-style:none;"
                  >
                    <img src="../../../../public/favicon.png" style="width: 80%;" alt="Avatar">
                  </a>
                </md-bottom-bar-item>
              </center>
            </div>
            <div class="md-layout-item md-size-20" style="padding: 0;">
              <center>
                <md-bottom-bar-item
                  style="background-color: #01C73E !important;width: 100%;"
                  to="/incomes"
                  :md-label="`${lg.modules.income}`"
                  md-icon="monetization_on"
                ></md-bottom-bar-item>
              </center>
            </div>

            <div class="md-layout-item md-size-20" style="padding: 0;">
              <center>
                <md-bottom-bar-item
                  style="background-color: #01C73E !important;width: 100%;"
                  to="/menu"
                  :md-label="'Otros'"
                  md-icon="menu"
                ></md-bottom-bar-item>
              </center>
            </div>
          </div>
      </md-bottom-bar>-->
    </div>
  </md-content>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeTab: 0,
      showNav: true
    };
  },

  components: {},
  methods: {},
  computed: {
    ...mapGetters({
      getBottomState: 'getBottomState'
    })
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped>
.phone-viewport {
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 60px !important;
}

@media (min-width: 618px) {
  #bottom_navbar {
    display: none;
  }
}
</style>
