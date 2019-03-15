import axios from 'axios';
import api from '../../lib/api'

export default {
  namespaced: true,
  state: {
    phone: {
      phone: '',
      label: ''
    },
    email: {
      email: '',
      label: ''
    },
    company: {
      idNumber: '',
      legalName: '',
      name: '',
      website: '',
      admins: [],
      phones: [],
      emails: [],
      address: {},
      businessType: []
    },
    business: []
  },
  mutations: {
    SET_BUSINESS(state, payload) {
      state.business = payload;
    },
    SET_COMPANY(state, payload) {

      if (payload.attr) {
        if (payload.second_level) {
          state.company[payload.attr][payload.second_level] = payload.value;
        } else {
          state.company[payload.attr] = payload.value;
        }
      } else {
        state.company = payload;
      }
    },
    // ADD_COMPANY(state, payload) {
    //   state.business.push(payload)
    // },

    ADD_OBJECT(state, payload) {
      let obj = {
        name: payload.name,
        number: payload.number
      }
      state.company[payload.attr].push(obj)
    },

    ADD_PHONE(state, payload) {
      state.company.phones.push({
        phone: payload.phone,
        label: payload.label
      });

    },
    DELETE_PHONE(state, payload) {
      let index = state.company.phones.indexOf(payload);
      state.company.phones.splice(index, 1);
    },
    UPDATE_PHONE(state, payload) {
      if (payload.attr) {
        state.phone[payload.attr] = payload.value;
      } else {
        state.phone = payload;
      }
    },

    UPDATE_EMAIL(state, payload) {
      if (payload.attr) {
        state.email[payload.attr] = payload.value;
      } else {
        state.email = payload;
      }
    },
    ADD_EMAIL(state, payload) {
      state.company.emails.push({
        email: payload.email,
        label: payload.label
      });
    },
    DELETE_EMAIL(state, payload) {
      let index = state.company.emails.indexOf(payload);
      state.company.emails.splice(index, 1);
    },

    SET_ADDRESS(state, payload) {
      if (payload.attr) {
        state.company.address[payload.attr] = payload.value;
      } else {
        state.company.address = payload;
      }
    },

    CLEAN_COMPANY(state) {
      state.company = {
        idNumber: '',
        legalName: '',
        name: '',
        website: '',
        admins: [],
        phones: [],
        emails: [],
        address: {},
        businessType: []
      }
    }



  },
  actions: {

    getAllBusiness({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/business?isActive=true')
          .then(data => {
            commit('SET_BUSINESS', data.data);
            console.log(data)
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    getCompany({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/business/' + payload)
          .then(data => {
            commit('SET_COMPANY', data.data);

            resolve(data.data);
            console.log(data.data)
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    postCompany({
      commit
    }, payload) {

      payload.type = 'business'
      console.log("POST BUSSINESS -> ", payload);
      return new Promise((resolve, reject) => {
        axios
          .post(api + '/business/create', payload)
          .then(data => {
            console.log(data.data);
            // commit('ADD_COMPANY', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },


    putCompany({
      commit
    }, payload) {

      console.log("PUT BUSSINESS -> ", payload);
      return new Promise((resolve, reject) => {
        axios
          .put(api + '/business/' + payload._id, payload)
          .then(data => {
            console.log(data.data);
            commit('SET_COMPANY', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

  },
  getters: {
    getBusiness: state => state.business,
    getOneCompany: state => state.company,
  }
};
