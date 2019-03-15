import axios from 'axios';
import api from '../../lib/api';

export default {
  namespaced: true,
  state: {
    taxes: Array(),
    tax: {}
  },
  mutations: {
    setTaxes(state, payload) {
      state.taxes = payload;
    },
    setTax(state, payload) {
      state.tax = payload;
    }

  },
  actions: {

    getAllTaxes({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/taxes/')
          .then(data => {
            console.log('TAXES -> ', data.data);
            commit('setTaxes', data.data);
            resolve(payload);
          })
          .catch(err => {
            console.log(err);
            reject(err, err.response);
          });
      });
    },


    getTax({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/taxs/find/' + payload)
          .then(data => {
            console.log('TAX -> ', data.data);
            commit('setTax', data.data);
            resolve(payload);
          })
          .catch(err => {
            console.log(err);
            reject(err, err.response);
          });
      });
    },

  },
  getters: {
    getTaxes: state => state.taxes,
    getTax: state => state.tax,
  }
};
