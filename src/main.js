import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardPlugin from './material-dashboard';
import validateDictionary from '././assets/js/vee-validate-messages';
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css';

// import validateMsg from './languages/main';

// Plugins
import App from './App.vue';
import Chartist from 'chartist';
import router from './routes/routes';
import store from './store/store';

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);



import money from 'v-money';
Vue.use(money, {
  precision: 4
});

import VeeValidate from 'vee-validate';

const config = {
  dictionary: validateDictionary
};
//  console.log(validateMsg.es.validations.dictionary.en.messages);
Vue.use(VeeValidate, config);
Vue.config.debug = true;

// DATE FILTER TO TABLES AND LIST
import moment from 'moment';
Vue.filter('shortDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});

import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

library.add(faCoffee);

Vue.component('font-awesome-icon', FontAwesomeIcon);
import axios from 'axios';
Vue.prototype.$http = axios;
import VueTypeahead from 'vue-typeahead';

import Notifications from './components/NotificationPlugin';
Vue.use(Notifications);

// register the plugin on vue
import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  theme: 'bubble',
  position: 'bottom-right',
  duration: 5000,
  icon: 'check_circle',
  type: 'success'
})
// you can also pass options, check options reference below
Vue.use(Toasted, {
  position: 'top-left',
  duration: 5000,
  iconPack: 'material'
})



import Vuetify from 'vuetify';

Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

// LANGUAGES
const navigatorLanguage = navigator.language.slice(0, 2);
import language from './languages/main';
Vue.prototype.lg = language[navigatorLanguage];

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// AXIOS CONFIG
// axios.defaults.withCredentials = true;
// Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
  // Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
  // Vue.prototype.$http.defaults.withCredentials = true;
}
import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist;
  }
});
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAgOvJ2MgtUisrGe-qgyqLtVZ9ZWMtAdOU",
    libraries: "places"
  }
});

import {
  VueHammer
} from 'vue2-hammer'

VueHammer.config.swipe = {
  direction: 'horizontal'
};
Vue.use(VueHammer)

Vue.directive('init', {
  bind: function (el, binding, vnode) {
    vnode.context[binding.arg] = JSON.parse(JSON.stringify(binding.value))
  }
});




/* eslint-disable no-new */
Vue.config.devtools = true;
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  VueTypeahead,
  data: {
    Chartist: Chartist
  }
});
Vue.config.devtools = true;
