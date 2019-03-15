import axios from 'axios';
import api from '../../lib/api'

export default {
  namespaced: true,
  state: {
    contacts: [],
    contact: {}
  },
  mutations: {
    SET_CONTACTS(state, payload) {
      state.contacts = payload;
    },
    SET_CONTACT(state, payload) {
      console.log(payload);
      if (payload._id) {
        state.contact = payload

      } else {
        state.contact[payload.attr] = payload.value;
      }

    },
    CLEAN(state) {
      state.contact = {};
    },




  },
  actions: {

    postContact({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(api + '/contacts', payload)
          .then(data => {
            // SET CONTACT
            commit('SET_CONTACT', data.data);



            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    findContact({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/users/find/' + payload)
          .then(data => {
            commit('SET_CONTACT', {
              attr: 'user',
              value: (data.data.docs[0]) ? data.data.docs[0]._id : null
            });


            console.warn('user => ', data.data.docs[0])
            resolve((data.data.docs[0]) ? data.data.docs[0] : null);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },


  },
  getters: {
    getContacts: state => state.contacts,
    getContact: state => state.contact,
  }
};
