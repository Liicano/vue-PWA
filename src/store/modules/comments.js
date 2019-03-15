import axios from 'axios';
import api from '../../lib/api'

export default {
  namespaced: true,
  state: {
    comments: [],
    comment: ''
  },
  mutations: {
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    SET_COMMENT(state, payload) {
      state.comment = payload;
    },

    ADD_COMMENT(state, payload) {
      state.comments.unshift(payload);
    }

  },
  actions: {

    getAllComments({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/comments/' + payload.parent + '/' + payload.type)
          .then(data => {
            commit('SET_COMMENTS', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    postComment({
      commit
    }, payload) {
      console.log(payload);
      let comnt = {
        from: {
          id: (payload.type == 'item') ? this.getters['items/getItem']._id : (payload.type == 'movement') ? this.getters['incomes/getIncome']._id : null,
          name: payload.type
        },
        text: payload.txt

      }
      console.log(comnt);

      return new Promise((resolve, reject) => {
        axios
          .post(api + '/comments', comnt)
          .then(data => {
            commit('ADD_COMMENT', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
      console.log(payload);
    },

  },
  getters: {
    getComments: state => state.comments,
    getComment: state => state.comment,
  }
};
