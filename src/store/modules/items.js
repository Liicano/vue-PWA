import axios from 'axios'
import api from '../../lib/api'

export default {
  namespaced: true,
  state: {
    items: Array(),
    userItems: [],
    item: {
      item: '',
      name: '',
      price: 0,
      quantity: 1,
      tax: [],
      estimate: {
        buy: {
          lock: false,
          price: ''
        },
        sell: {
          lock: false,
          price: ''
        }
      },
      margin: {
        max: {
          percentage: '',
          price: ''
        },
        min: {
          percentage: '',
          price: ''
        }
      }
    },
    selectedItems: [],
    selectedItemsAdd: [],
    globalCreateValues: {
      price: 0,
      quantity: 1
    }
  },
  mutations: {
    SET_ITEMS(state, payload) {
      state.items = payload
    },
    SET_USER_ITEMS(state, payload) {
      state.userItems = payload
    },
    SET_ITEM(state, payload) {
      state.item.movement =
        this.getters['incomes/getIncome']._id != undefined ?
        this.getters['incomes/getIncome']._id :
        null

      if (payload._id) {
        state.item = payload
      } else {
        if (payload.attr == 'item') {
          ;
          (state.item['name'] = payload.value.name),
          (state.item['item'] = payload.value._id)
        } else {
          if (payload.attr && payload.attr2 && payload.attr3) {
            state.item[payload.attr][payload.attr2][payload.attr3] =
              payload.value
          }
          if (payload.attr && payload.attr2 && !payload.attr3) {
            state.item[payload.attr][payload.attr2] = payload.value
          }
          if (payload.attr && !payload.attr2 && !payload.attr3) {
            state.item[payload.attr] = payload.value
          }
        }
      }
    },

    HANDLE_SELECT_INPUT(state, payload) {
      state.item.tax = JSON.parse(JSON.stringify(payload))
    },

    CLEAN(state) {
      console.log('limpiando el item')
      state.item = {
        item: '',
        name: '',
        price: 0,
        quantity: 1,
        tax: [],
        estimate: {
          buy: {
            lock: false,
            price: 0
          },
          sell: {
            lock: false,
            price: 0
          }
        },
        margin: {
          max: {
            percentage: 0,
            price: 0
          },
          min: {
            percentage: 0,
            price: 0
          }
        }
      }
    },

    CLEAN_SELECTION(state, payload) {
      state[payload].splice(0, state[payload].length)
    },

    HANDLE_SELECTIONS(state, payload) {
      if (payload.isSingle) {
        const i = state[payload.var][0]
        if (i > -1) {
          state[payload.var].splice(0, 1)
        } else {
          state[payload.var].push(payload.index)
        }

      } else {
        const i = state[payload.var].indexOf(payload.index)
        if (i > -1) {
          state[payload.var].splice(i, 1)
        } else {
          state[payload.var].push(payload.index)
        }
      }

    },

    EDIT_SELECTION(state, payload) {
      var keys = Object.keys(payload.edit)

      for (let index = 0; index < state[payload.var].length; index++) {
        let line = this.getters['incomes/getIncome'].lines[
          state[payload.var][index]
        ]

        if (payload.delete == false) {
          if (payload.edit[keys[0]] != null && payload.edit[keys[0]] != '') {
            line[keys[0]] = payload.edit[keys[0]]
          } else {
            line[keys[0]] = line[keys[0]]
          }
          if (payload.edit[keys[1]] != null && payload.edit[keys[1]] != '') {
            line[keys[1]] = payload.edit[keys[1]]
          } else {
            line[keys[1]] = line[keys[1]]
          }

          line.currency = this.getters['incomes/getIncome'].currency
          line.movementType = payload.movementType

          this.dispatch('incomes/putLine', line)
        } else {
          this.dispatch('incomes/deleteLine', line)
        }
      }
      this.commit('items/CLEAN_SELECTION', payload.var)
    },
    SET_GLOBALS_CREATE(state, payload) {
      if (payload == null) {
        state.globalCreateValues = {
          price: 0,
          quantity: 1
        }
      } else {
        state.globalCreateValues[payload.attr] = payload.value
      }
    }
  },
  actions: {
    getAllItems({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/items/?isActive=true')
          .then(data => {
            console.log('ITEMS -> ', data.data)
            commit('SET_ITEMS', data.data)
            resolve(data.data)
          })
          .catch(err => {
            console.log(err)
            reject(err, err.response)
          })
      })
    },
    getUserItems({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/users/lastItems')
          .then(data => {
            console.log('LAST ITEMS -> ', data.data)
            commit('SET_USER_ITEMS', data.data)
            resolve(data.data)
          })
          .catch(err => {
            console.log(err)
            reject(err, err.response)
          })
      })
    },

    getItem({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .get(api + '/items/find/' + payload)
          .then(data => {
            console.log('ITEM -> ', data.data)
            commit('SET_ITEM', data.data)
            resolve(data.data)
          })
          .catch(err => {
            console.log(err)
            reject(err, err.response)
          })
      })
    },

    findItem({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/items/' + payload)
          .then(data => {
            commit('SET_ITEM', data.data)
            resolve(data.data)
          })
          .catch(err => {
            console.log(err)
            reject(err, err.response)
          })
      })
    },

    setItem({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_ITEM', payload)
        resolve(payload)
      })
    },

    postItem({
      commit
    }, payload) {
      console.log('EN ITEMS.JS -> ', payload)
      return new Promise((resolve, reject) => {
        axios
          .post(api + '/items/', payload)
          .then(data => {
            console.log(data)
            // SET INITIAL PRICE AND QUANTITY
            data.data.price = this.state.items.item.price
            data.data.quantity = this.state.items.item.quantity
            data.data.item = data.data._id
            data.data.justCreated = true;
            (data.data.tax = null),
            (data.data.movement =
              this.getters['incomes/getIncome']._id != undefined ?
              this.getters['incomes/getIncome']._id :
              null),
            (data.data.currency =
              this.getters['incomes/getIncome'].currency != undefined ?
              this.getters['incomes/getIncome'].currency :
              null)

            commit('SET_ITEM', data.data)
            resolve(data.data)
          })
          .catch(err => {
            reject(err, err.response)
          })
      })
    },

    putItem({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(api + '/items/' + payload._id, payload)
          .then(data => {
            commit('SET_ITEM', data.data)
            resolve(data.data)
          })
          .catch(err => {
            reject(err, err.response)
          })
      })
    }
  },
  getters: {
    getItems: state => state.items,
    getItem: state => state.item,
    getSelectedItems: state => state.selectedItems,
    getSelectedItemsAdd: state => state.selectedItemsAdd,
    getUserLastItems: state => state.userItems,
    getGlobalItemVars: state => state.globalCreateValues
  }
}
