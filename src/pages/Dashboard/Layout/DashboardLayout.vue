<template>
  <div
    class="wrapper"
    :class="[{'nav-open': $sidebar.showSidebar}, {'rtl': $route.meta.rtlActive}]"
  >
    <side-bar>
      <user-menu v-if="!this.$route.meta.hideNavbar"></user-menu>
      <mobile-menu></mobile-menu>
      <template slot-scope slot="links">
        <!-- LINKS DE UNABASE -->
        <div class="container-fluid">
          <!-- DASHBOARD -->
          <sidebar-item :link="{name: `Inicio`, icon: 'home', path: '/dashboard'}"></sidebar-item>
          <!-- INCOME -->
          <sidebar-item
            :link="{name: `${lg.modules.income}`, icon: 'monetization_on', path: '/incomes'}"
          ></sidebar-item>
          <sidebar-item :link="{name: `Gastos`, icon: 'local_mall', path: '/outcomes'}"></sidebar-item>

          <sidebar-item :link="{name: `Items`, icon: 'description', path: '/items'}"></sidebar-item>
        </div>
        <!-- ESPACIADO -->
        <br>
        <md-divider style="color:white"></md-divider>
        <br>

        <!-- LISTADO DE EMRPESAS (ESCRITORIO) -->
        <div class="container-fluid">
          <business-menu></business-menu>
        </div>
        <!-- MENU DE HERRAMIENTAS -->
        <!-- <div class="container-fluid">
          <tools-menu></tools-menu>
        </div>-->
      </template>
    </side-bar>

    <div class="row">
      <div class="col s12" style="padding: 0 !important;">
        <div class="main-panel" style="background: #fafafa;">
          <top-navbar v-if="inMobile && !this.$route.meta.hideNavbar"></top-navbar>
          <top-navbar v-else-if="!this.$route.meta.hideNavbar"></top-navbar>

          <md-content
            style="max-height: 90vh;min-height: 90vh;"
            @scroll.native="handleScroll($event)"
          >
            <v-app>
              <div
                :class="[{content: !$route.meta.hideContent}, (inMobile)? 'noPadding' : 'paddingDesktop']"
                @click="toggleSidebar"
              >
                <zoom-center-transition :duration="200" mode="out-in">
                  <!-- CONTENIDO DE LA APP -->
                  <router-view></router-view>
                </zoom-center-transition>
              </div>
            </v-app>
          </md-content>
        </div>
      </div>
    </div>

    <!-- BOTTOM NAVBAR -->
    <div class="row">
      <div class="col s12" style="padding: 0 !important;">
        <bottom-nav v-if="!this.$route.meta.hideBottomBar"></bottom-nav>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  console.log(className);
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from './TopNavbar.vue';
import isMobile from '../../../assets/js/isMobile.js';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from './Extra/MobileMenu.vue';
import UserMenu from './Extra/UserMenu.vue';
import ToolsMenu from './Extra/toolsMenu.vue';
import businessMenu from './Extra/businessMenu';
import scrollBtn from '../Components/scrollerBtn';

import bottomNav from './bottomNav';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    UserMenu,
    ToolsMenu,
    SlideYDownTransition,
    ZoomCenterTransition,
    bottomNav,
    businessMenu,
    scrollBtn
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      initialPosition: 0,
      inMobile: null,
      lineHeigth: 10,
      scrollStep: this.lineHeight * 3,
      startHeight: 0
    };
  },
  mounted() {},
  methods: {
    ...mapMutations({
      showBottomMenu: 'HIDE_SHOW_BOTTOM',
      showBottomTotals: 'HIDE_SHOW_TOTALS'
    }),

    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    handleResize() {
      if (window.innerHeight < this.startHeight) {
        this.showBottomMenu(false);
        this.showBottomTotals(false);
        console.log('quitando menu');
      } else {
        if (!this.$route.meta.isList) {
          this.showBottomMenu(false);
          console.log('poniendo menu');
        } else {
          this.showBottomMenu(true);
        }
        if (this.$route.name == 'Income') {
          this.showBottomTotals(true);
          console.log(' poniendo totals');
        }
      }
    },
    ...mapActions({
      getAllBusiness: 'business/getAllBusiness'
    }),

    handleScroll(event) {
      if (event.target.scrollTop > this.initialPosition) {
        if (this.$route.meta.isList) {
          this.showBottomMenu(false);
        }
      } else if (event.target.scrollTop < this.initialPosition) {
        if (this.$route.meta.isList) {
          this.showBottomMenu(true);
        }
      }

      this.initialPosition = event.target.scrollTop;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.startHeight = window.innerHeight;
    this.inMobile = isMobile;
    this.getAllBusiness();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith('Win');
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar('sidebar');
      initScrollbar('sidebar-wrapper');
      initScrollbar('main-panel');

      docClasses.add('perfect-scrollbar-on');
    } else {
      docClasses.add('perfect-scrollbar-off');
    }
  },
  computed: {
    ...mapState({
      showBottom: 'showBottom'
    }),
    ...mapGetters({
      getBottomState: 'getBottomState',
      getCurrencyConfig: 'getCurrencyConfig'
    })
  }
};
</script>
<style lang="scss">
@media (max-width: 992px) {
  .espaceMobile {
    display: none;
  }
}

@media (min-width: 992px) {
  .espaceDesktop {
    display: none;
  }
}

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
#main_panel {
  margin-top: -5%;
}

.noPadding {
  padding: 0 !important;
}
.paddingDesktop {
  padding: 10px 15px !important;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition-timing-function: cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50%);
  opacity: 0;
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
  margin-top: 10px;
  padding: 0;
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
</style>
