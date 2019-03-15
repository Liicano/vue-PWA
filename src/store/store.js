import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import users from './modules/users';
import incomes from './modules/incomes';
import items from './modules/items';
import tax from './modules/taxes';
import comments from './modules/comments';
import contacts from './modules/contacts';
import business from './modules/business';
import currency from './modules/currency'

export default new Vuex.Store({
  strict: true,
  state: {
    nav: [],
    autocompleteResults: [],
    showBottom: true,
    showTotals: false,
    seeDetails: false,
    showNavbar: true,
    showSpinner: false,
    showDialogMessage: false,
    incomesGetParams: 'isActive=true&',
    userCurrency: {},
    bussinesScope: {},
    isOutcome: false,
    optionalEmail: false,
    bottomModal: false,
    enableEdit: false,
    showDialogIncome: false,
  },
  modules: {
    users,
    incomes,
    items,
    tax,
    comments,
    contacts,
    business,
    currency
  },
  mutations: {
    HIDE_SHOW_BOTTOM(state, payload) {
      state.showBottom = payload;
    },
    HIDE_SHOW_TOTALS(state, payload) {
      state.showTotals = payload;
    },
    HIDE_SHOW_INPUTS(state, payload) {
      state.showInputs = payload.state;
    },
    HIDE_SHOW_NAVBAR(state, payload) {
      state.showNavbar = payload;
    },
    SET_INCOMES_PARAMS(state, payload) {
      state.incomesGetParams = payload;
    },
    HANDLE_SPINNER(state, payload) {
      state.showSpinner = payload;
    },
    HANDLE_MSG_DIALOG(state, payload) {
      state.showDialogMessage = payload;
    },
    HANDLE_ISOUTCOME(state, payload) {
      state.isOutcome = payload;
    },
    HANDLE_OPTIONAL_EMAIL(state, payload) {
      state.optionalEmail = payload;
    },
    HANDLE_BOTTOM_MODAL(state, payload) {
      state.bottomModal = payload;
    },
    HANDLE_EDIT(state, payload) {
      state.enableEdit = payload
    },
    HANDLE_DETAILS(state, payload) {
      state.seeDetails = payload
    },
    CHANGE_BUSINESS(state, payload) {
      state.bussinesScope = payload
    },
    HANDLE_ITEM_DIALOG(state, payload) {
      state.showDialogIncome = payload;
    },
    SET_USER_CURRENCY(state, payload) {
      state.userCurrency = payload;
    }
  },
  actions: {},
  getters: {
    getRouteParams: state => state.incomesGetParams,
    getIsOutcome: state => state.isOutcome,
    getBottomModalState: state => state.bottomModal,
    getEnableEdit: state => state.enableEdit,
    getSeeDetails: state => state.seeDetails,
    getBusinessScope: state => state.bussinesScope,
    getShowDialogIncome: state => state.showDialogIncome,
    getBottomState: state => state.showBottom,
    getShowTotals: state => state.showTotals,
    getCurrencyConfig: state => state.currencyConfig,
    getUserCurrency: state => state.userCurrency
  }
});
