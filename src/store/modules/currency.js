import axios from 'axios';
import api from '../../lib/api'

export default {
  namespaced: true,
  state: {
    currencies: [],
    currency: {}
  },
  mutations: {
    SET_CURRENCIES(state, payload) {
      state.currencies = payload;
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload;
    },

  },
  actions: {

    getAllCurrencies({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/currencies/')
          .then(data => {
            commit('SET_CURRENCIES', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },



  },
  getters: {
    getCurrencies: state => state.currencies,
    getCurrency: state => state.currency,
  }
};
