import axios from 'axios';
import api from '../../lib/api';
import invoice_generator from '../../assets/js/invoice';

export default {
  namespaced: true,
  state: {
    incomes: [],
    income: {
      name: null,
      description: null,
      dates: {
        expiration: new Date()
      },

      creator: null,

      responsable: {
        type: null,
        data: null
      },
      contactName: '',
      client: {
        type: null,
        data: null
      },

      lines: [],
      total: {
        net: 0,
        tax: 0
      },

      state: 'draft',
      isActive: true,
      currency: null
    },

    errors: null,
    optionalUser: {
      name: null,
      email: null
    }
  },
  mutations: {
    SET_INCOMES(state, payload) {
      state.incomes = payload;
    },
    SET_INCOME(state, payload) {
      if (payload._id) {
        state.income = payload;
      } else {
        if (payload.second_level) {
          state.income[payload.attr][payload.second_level] = payload.value;
        } else {
          state.income[payload.attr] = payload.value;
        }
      }
    },
    SET_OPTIONAL_CONTACT(state, payload) {
      state.optionalUser = payload;
    },

    INVOICE(state, payload) {
      invoice_generator(payload);
    },

    ANULATE(state) {
      state.income.isActive = false;
    },

    CLEAN(state) {
      state.income = {
        name: null,
        description: null,
        dates: {
          expiration: null
        },

        creator: null,

        responsable: {
          type: null,
          data: null
        },
        contactName: '',
        client: {
          type: null,
          data: null
        },

        lines: [],
        total: {
          net: 0,
          tax: 0
        },
        state: null,
        isActive: true,
        currency: null
      };
    },

    SHARE(state, payload) {
      if (payload.name) {
        console.log('SHARE!');
      } else {
        console.log('¡NO PAYLOAD!');
      }
    },

    DELETE_LINE(state, payload) {
      let index = state.income.lines.indexOf(payload);
      state.income.lines.splice(index, 1);
    },

    ADD_LINE(state, payload) {
      let index = state.income.lines.indexOf(payload);

      if (index == -1) {
        state.income.lines.unshift(payload);
      } else {
        state.income.lines[index] = payload;
      }
    },

    ERRORS(state, payload) {
      state.errors = payload;
    },

    SLICE_INCOME(state, payload) {
      let index = state.incomes.docs.findIndex(x => x._id == payload._id)
      state.incomes.docs.splice(index, 1)
    }

  },

  actions: {
    createInvoice({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('INVOICE', payload);
        resolve(payload);
      });
    },
    getAllIncomes({
      commit
    }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .get(
            api + '/movements/' + ((payload.isBusiness != '') ? 'business' : 'personal') + '/' + payload.type + payload.isBusiness + '?' + payload.params
          )
          .then(data => {
            console.log('movimientos -> ', data.data);

            commit('SET_INCOMES', data.data);
            resolve(data.data);
          })
          .catch(err => {
            commit('ERRORS', err);
            reject(err, err.response);
          });
      });
    },

    getIncome({
      commit
    }, payload) {
      // console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .get(api + '/movements/' + payload)
          .then(data => {
            console.log('INCOME -> ', data.data);
            commit('SET_INCOME', data.data);
            resolve(data.data);
          })
          .catch(err => {
            console.log(err);
            reject(err, err.response);
          });
      });
    },

    postIncome({
      commit
    }, payload) {
      console.log("ANTES DEL TRANSFORM -> ", payload);
      // CHECK PARA CUANDO ES EMPRESA
      if (payload.responsable.type && payload.responsable.type != null) {

        if (payload.responsable.data._id == this.getters['users/user']._id) {
          let businessCheck = this.getters['getBusinessScope'];
          if (businessCheck._id) {
            payload.responsable.data = businessCheck
            payload.responsable.type = 'Business'

          } else {
            payload.responsable.data = payload.responsable.data
          }
          (businessCheck._id) ? payload.isBusiness = true: payload.isBusiness = false
        }
      }

      if (payload.client.type && payload.client.type != null) {

        if (payload.client.data._id == this.getters['users/user']._id) {
          let businessCheck = this.getters['getBusinessScope'];
          if (businessCheck._id) {
            payload.client.data = businessCheck
            payload.client.type = 'Business'
          } else {
            payload.client.data = payload.client.data
          };
          (businessCheck._id) ? payload.isBusiness = true: payload.isBusiness = false
        }
      }


      (payload.responsable.data.legalName != undefined) ? payload.responsable.type = 'Business': payload.responsable.type;
      (payload.client.data.legalName != undefined) ? payload.client.type = 'Business': payload.client.type;
      payload.currency = this.getters['users/user'].currency
      console.warn('!POST MOVEMENT!', payload);

      return new Promise((resolve, reject) => {
        axios
          .post(api + '/movements/', payload)
          .then(data => {
            commit('SET_INCOME', data.data);
            resolve(data.data);
            console.warn('data.data => ', data.data);

          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    postLine({
      commit
    }, payload) {
      console.log(payload);
      if (payload.tax) payload.tax = (payload.tax.length == 0) ? null : payload.tax
      return new Promise((resolve, reject) => {
        axios
          .post(api + '/lines', payload)
          .then(data => {
            commit('ADD_LINE', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    putLine({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(api + '/lines/' + payload._id, payload)
          .then(data => {
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    deleteLine({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(api + '/lines/' + payload._id, payload)
          .then(data => {
            commit('DELETE_LINE', payload);
            resolve(payload);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    putIncome({
      commit
    }, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .put(api + '/movements/' + payload._id, payload)
          .then(data => {
            console.log('put income -> ', data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    anulateIncome({
      state,
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('ANULATE', payload);
        axios
          .put(api + '/movements/' + payload._id, payload)
          .then(data => {
            resolve(true);
          })
          .catch(err => {
            reject(err, err.response);
          });
      });
    },

    shareIncome({
      state,
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        console.log(state);
        console.log(payload);

        let obj = {
          to: payload.client.type == 'User' ?
            payload.client.data.emails[0].email : (payload.client.type == 'Contact') ?
            payload.client.data.email : state.optionalUser.email,

          subject: (payload.responsable.type ?
            payload.responsable.data.name :
            payload.responsable.name) + ' te envio una cotización',
          html: ` <p>&nbsp;</p>
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          <td style="padding: 10px 0 30px 0;">
          <table style="border: 1px solid #cccccc; border-collapse: collapse;" border="0" width="600" cellspacing="0" cellpadding="0" align="center">
          <tbody>
          <tr>
          <td style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;" align="center" bgcolor="#fafafa"><img style="display: block; width: 100px;
          height: 100px;" src="https://unabase.net/img/logotipo.png" alt="Logotipo unabase" width="300" height="230" /></td>
          </tr>
          <tr>
          <td style="padding: 40px 30px 40px 30px;" bgcolor="#ffffff">
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;"><strong>&iexcl;Hola!,${
            payload.client.type == 'User'
              ? payload.client.data.name
              : payload.client.type == 'Contact'
              ? payload.client.data.name
              : state.optionalUser.name
          }</strong></td>
          </tr>
          <tr>
          <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">` +
            payload.responsable.data.name +
            ` te ha cotizado en <strong>Unabase</strong>, ingresa y revisa la cotizaci&oacute;n.</td>
          </tr>
          <tr>
          <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          
          <td>
          <br>
          <center>
          <h3>` +
            payload.name +
            `</h3>
          </center>
          <br>

           <center>
           
          <center>
          <h4>Principales items dentro de la cotizaci&oacute;n</h4>
          </center></td>
          </tr>
          <tr>
          <td style="font-size: 17px; line-height: 15px;">
           
          <br />
          <center>
         <ul id="ul1" style=" border:none;
         padding: 0;
         display:table;
         width:100%;
         box-sizing:border-box;
         -moz-box-sizing:border-box;
         -webkit-box-sizing:border-box;">
         <center>
         <li style="display:table-cell;"><center>${payload.lines[0].name.toUpperCase()}</center></li>
         
         </center>
          
         </ul>
          </center>

          <center>
         <ul id="ul1" style=" border:none;
         padding: 0;
         display:table;
         width:100%;
         box-sizing:border-box;
         -moz-box-sizing:border-box;
         -webkit-box-sizing:border-box;">
          <center>
          <li style="display:table-cell;"><center>${
            payload.lines[1] ? payload.lines[1].name.toUpperCase() : ''
          }</center></li>
         
          </center>
          
         </ul>
          </center>

          <center>
         <ul id="ul1" style=" border:none;
         padding: 0;
         display:table;
         width:100%;
         box-sizing:border-box;
         -moz-box-sizing:border-box;
         -webkit-box-sizing:border-box;">
         <center>
         <li style="display:table-cell;"><center>${
           payload.lines[2] ? payload.lines[2].name.toUpperCase() : ''
         }</center></li>
        
         </center>
          
         </ul>
          </center>
         
           </center>
          
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          <tr>
          <td><center><a style="display: block; width: 115px; height: 25px; font-style: none; background: #01C73E; padding: 10px; text-align: center; border-radius: 5px; color: white; font-weight: bold; text-decoration: none;" href="https://app.unabase.com/movement/` +
            payload._id +
            `">Ver mi compra</a></center></td>
          </tr>
          <tr>
          <td>
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          <td valign="top" width="260"><br /> <br />
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          <td><center>
          <h4>Vendedor</h4>
          <hr>
          </center></td>
          </tr>
          <tr>
          <td style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"><center><img style="border-radius: 50px;" src="${
            payload.responsable.data.imgUrl
          }"/></center></td>
          <td style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"><center>
          <p>` +
            payload.responsable.data.name +
            `</p>
          <strong>${
            payload.responsable.data.idNumber
              ? payload.responsable.data.idNumber
              : 'Sin documento de identidad'
          } </strong> <br /> <strong>${
              payload.responsable.data.emails[0]
                ? payload.responsable.data.emails[0].email
                : 'Sin email'
            } </strong></center></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          <tr>
          <td style="padding: 30px 30px 30px 30px;" bgcolor="#01C73E">
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
          <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">&reg; Unabase, derechos reservados, 2018.<br /> <a style="color: #ffffff;" href="http://www.unabase.cl/"><span style="color: #ffffff;">Ir a pagina principal</span></a></td>
          
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table> `
        };

        axios
          .post(api + '/mailer', obj)
          .then(data => {
            // commit('SHARE', payload);
            resolve(data.data);
          })
          .catch(err => {
            // reject(err, err.response);
          });
      });
    }
  },
  getters: {
    getIncomes: state => state.incomes,
    getIncome: state => state.income,
    getErrors: state => state.errors
  }
};
