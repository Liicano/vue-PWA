<template>
  <div>
    <div>
      <div v-if="getErrors">
        <error-modal :errorObject="getErrors"></error-modal>
      </div>

      <!-- LISTA -->
      <div class="md-layout">
        <div class="md-layout-item md-size-10F0 md-xsmall-size-100" style="padding: 0 !important">
          <div v-if="loading">
            <spinner></spinner>
          </div>
          <center v-if="!incomes.docs"></center>
          <ul v-else class="collection" style="padding: 0; border-style: none;">
            <div class="container-fluid" v-if="getIncomes.docs.length <= 0">
              <center class="spinner">
                <md-empty-state
                  md-icon="add_shopping_cart"
                  md-label="Crea tu primera venta"
                  md-description="Crea tu primera venta dando click al boton de abajo."
                >
                  <router-link
                    :to="{path:'/income'}"
                    class="md-success md-raised md-simple"
                    tag="md-button"
                  >Nueva venta</router-link>
                </md-empty-state>
              </center>
            </div>
            <div v-else>
              <transition-group name="slide-fade">
                <li
                  class="collection-item avatar"
                  v-for="(income, index) in getIncomes.docs"
                  :key="income._id"
                  @click="handleBottomNav(false)"
                  v-hammer:swipe.right="(event)=> deleteIncome(income, index)"
                  v-init:currencyScope="{options: {thousandsSeparator:income.currency.thousand,decimalSeparator:income.currency.decimal,spaceBetweenAmountAndSymbol: true} }"
                >
                  <div>
                    <router-link :to="{path:'/income/'+income._id}" style="color: black;">
                      <div
                        v-if="income.client.type == 'User'"
                        style="margin-bottom: -83px; !important"
                      >
                        <div class="row">
                          <div class="col s12">
                            <img
                              v-if="income.client.data.imgUrl"
                              :src="income.client.data.imgUrl"
                              alt
                              :class="[(income.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                              style="vertical-align: center;"
                            >
                            <img
                              v-else
                              src="../../../public/img/default-avatar.png"
                              alt
                              :class="[(income.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                              style="vertical-align: center;"
                            >
                          </div>
                        </div>
                        <br>
                        <div class="row">
                          <div class="col s12" style="margin-left: -60px;">
                            <small
                              :class="[(income.state == 'draft')?'text-warning': 'text-success']"
                            >{{(income.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                          </div>
                        </div>
                      </div>

                      <div v-else style="margin-bottom: -83px; !important">
                        <div style="display:contents" v-if="income.client.type == 'Business'">
                          <div class="row">
                            <div class="col s12">
                              <img
                                src="../../assets/img/company_icon.png"
                                alt
                                :class="[(income.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                                style="vertical-align: center;"
                              >
                            </div>
                          </div>
                          <br>
                          <div class="row">
                            <div class="col s12" style="margin-left: -60px;">
                              <small
                                :class="[(income.state == 'draft')?'text-warning': 'text-success']"
                              >{{(income.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                            </div>
                          </div>
                        </div>

                        <div style="display:contents" v-else>
                          <div class="row">
                            <div class="col s12">
                              <img
                                src="../../../public/img/default-avatar.png"
                                alt
                                :class="[(income.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                                style="vertical-align: center;"
                              >
                            </div>
                          </div>
                          <br>
                          <div class="row">
                            <div class="col s12" style="margin-left: -60px;">
                              <small
                                :class="[(income.state == 'draft')?'text-warning': 'text-success']"
                              >{{(income.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span class>
                        <b>{{income.name}}</b>
                        <br>
                        <p>
                          {{get_clientName(income.client)}}
                          <br>
                          <small>{{income.createdAt | shortDate}}</small>
                        </p>
                      </span>
                      
                      <a style="text-decoration: none;" class="secondary-content valign-wrapper">
                        <h5
                          v-if="isMobile"
                          class="text-center text-success"
                        >{{(getTotal(income.lines).total) | currency(income.currency.prefix, income.currency.precision, currencyScope.options)}}</h5>
                        <h3
                          v-else
                          class="text-center text-success"
                        >{{(getTotal(income.lines).total) | currency(income.currency.prefix, income.currency.precision, currencyScope.options)}}</h3>
                      </a>
                    </router-link>
                  </div>
                </li>
              </transition-group>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// VUEX
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { Modal } from '@/components';
import errorModal from '@/pages/Dashboard/Components/errorModal.vue';
import isMobile from '../../assets/js/isMobile.js';
import spinner from '../Dashboard/Components/spinner';

import _ from 'lodash';

import {
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard
} from '@/components';

export default {
  components: {
    Modal,
    errorModal,
    ChartCard,
    spinner
  },

  data() {
    return {
      checkbox1: null,
      incomes: [],
      value: null,
      loading: false,
      getData: null,
      isMobile: null,
      showIncomes: true,
      showw: true,
      currencyScope: {}
    };
  },

  methods: {
    ...mapActions({
      getAllIncomes: 'incomes/getAllIncomes'
    }),
    ...mapMutations({
      hideShowBottom: 'HIDE_SHOW_BOTTOM',
      cleanItem: 'items/CLEAN',
      sliceIcome: 'incomes/SLICE_INCOME'
    }),

    handleBottomNav(state) {
      // this.cleanItem();
    },

    get_clientName(client) {
      if (
        client.type == 'User' ||
        client.type == 'Contact' ||
        client.type == 'Business'
      ) {
        return client.data.name;
      } else {
        return client.name;
      }
    },
    getTotal(lines) {
      let total = _.sumBy(lines, function(line) {
        return line.price * line.quantity;
      });

      return {
        net: total,
        tax: total * 0.19,
        total: total * 0.19 + total
      };
    },

    deleteIncome(movement) {
      this.showIncomes = false;
      if (movement) {
        let obj = {
          _id: movement._id,
          isActive: false
        };
        this.sliceIcome(movement);
        this.$store.dispatch('incomes/putIncome', obj).then(res => {
          if (res) {
            this.showIncomes = true;
            this.$toasted.show('Documento eliminado!');
            this.$router.push('/incomes');
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/user',
      getErrors: 'incomes/getErrors',
      getIncomes: 'incomes/getIncomes',
      getBusinessScope: 'getBusinessScope',
      getCurrencyConfig: 'getCurrencyConfig'
    }),
    ...mapState({
      incomesGetParams: 'incomesGetParams'
    })
  },

  mounted() {
    this.isMobile = isMobile;
    return new Promise((resolve, reject) => {
      if (this.getBusinessScope._id) {
        resolve('/' + this.getBusinessScope._id);
      } else {
        resolve('');
      }
    }).then(data => {
      this.getData = data;
      this.loading = true;
      this.getAllIncomes({
        params: `${this.incomesGetParams}`,
        type: 'in',
        isBusiness: data
      })
        .then(res => {
          this.incomes = res;
          this.loading = false;
        })
        .catch(err => {
          console.log('this.getErrors --> ', this.getErrors);
        });
    });
  },

  watch: {
    incomesGetParams: function() {
      this.getAllIncomes(`${this.incomesGetParams}`);
    },
    getBusinessScope: function(val) {
      this.getAllIncomes({
        params: `${this.incomesGetParams}`,
        type: 'in',
        isBusiness: val._id ? '/' + this.getBusinessScope._id : ''
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#tabla_ventas {
  display: none;
}

@media (min-width: 992px) {
  .md-hide-big {
    display: none;
  }
}

.md-layout-item {
  padding-right: 0px;
  padding-left: 0px;
}

.md-tabs {
  margin-bottom: 24px;
}
.spinner {
  height: 100%;
  width: 100%;
  display: flex;
  // position: fixed;
  align-items: center;
  justify-content: center;
}
.pendingClass {
  border-color: #ffd600;
  border-style: ridge;
}
.successClass {
  border-color: #00c853;
  border-style: ridge;
}

.md-list-item-content {
  padding: 0 !important;
}
.md-list-item .md-list-item-container .md-ripple {
  padding: 0 !important;
}
</style>
