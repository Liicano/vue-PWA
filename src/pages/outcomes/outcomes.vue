<template>
  <div>
    <div>
      <div v-if="getErrors">
        <error-modal :errorObject="getErrors"></error-modal>
      </div>

      <!-- LISTA -->
      <div class="md-layout">
        <div class="md-layout-item md-size-10F0 md-xsmall-size-100">
          <div v-if="loading">
            <spinner></spinner>
          </div>

          <center v-if="!outcomes.docs"></center>

          <ul v-else class="collection" style="padding: 0; border-style: none;">
            <div class="container-fluid" v-if="getOutcomes.docs.length <= 0">
              <center class="spinner">
                <md-empty-state
                  md-icon="add_shopping_cart"
                  md-label="No tienes compras"
                  md-description="Haz tu primera compra mediante unabase"
                ></md-empty-state>
              </center>
              <center>
                <router-link
                  :to="{path:'/outcome'}"
                  class="md-success md-raised md-simple"
                  tag="md-button"
                >Nueva compra</router-link>
              </center>
            </div>
            <div v-else>
              <transition-group name="slide-fade">
                <li
                  class="collection-item avatar"
                  v-for="(outcome, index) in getOutcomes.docs"
                  :key="outcome._id"
                  @click="handleBottomNav(false)"
                  v-hammer:swipe.right="(event)=> deleteIncome(outcome, index)"
                >
                  <div>
                    <router-link :to="{path:'/outcome/'+outcome._id}" style="color: black;">
                      <div v-if="outcome.responsable.type == 'User'" style="margin-bottom: -83px;">
                        <div class="row">
                          <div class="col s12">
                            <img
                              v-if="outcome.responsable.data.imgUrl"
                              :src="outcome.responsable.data.imgUrl"
                              alt
                              :class="[(outcome.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                              style="vertical-align: center;"
                            >
                            <img
                              v-else
                              src="../../../public/img/default-avatar.png"
                              alt
                              :class="[(outcome.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                              style="vertical-align: center;"
                            >
                          </div>
                        </div>
                        <br>
                        <div class="row">
                          <div class="col s12" style="margin-left: -60px;">
                            <small
                              :class="[(outcome.state == 'draft')?'text-warning': 'text-success']"
                            >{{(outcome.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                          </div>
                        </div>
                      </div>

                      <div v-else style="margin-bottom: -83px;">
                        <div style="display:contents" v-if="outcome.responsable.type == 'Business'">
                          <div class="row">
                            <div class="col s12">
                              <img
                                src="../../assets/img/company_icon.png"
                                alt
                                :class="[(outcome.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                                style="vertical-align: center;"
                              >
                            </div>
                          </div>
                          <br>
                          <div class="row">
                            <div class="col s12" style="margin-left: -60px;">
                              <small
                                :class="[(outcome.state == 'draft')?'text-warning': 'text-success']"
                              >{{(outcome.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                            </div>
                          </div>
                        </div>
                        <div style="display:contents" v-else>
                          <div class="row">
                            <div class="col s12">
                              <img
                                src="../../../public/img/default-avatar.png"
                                alt
                                :class="[(outcome.state == 'draft')?'pendingClass': 'successClass', 'circle']"
                                style="vertical-align: center;"
                              >
                            </div>
                          </div>
                          <br>
                          <div class="row">
                            <div class="col s12" style="margin-left: -60px;">
                              <small
                                :class="[(outcome.state == 'draft')?'text-warning': 'text-success']"
                              >{{(outcome.state == 'draft')?'Pendiente':'Finalizada'}}</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span class>
                        <b>{{outcome.name}}</b>
                      </span>

                      <p>
                        {{get_clientName(outcome.responsable)}}
                        <br>
                        <small>{{outcome.createdAt | shortDate}}</small>
                      </p>

                      <a style="text-decoration: none;" class="secondary-content valign-wrapper">
                        <h5
                          v-if="isMobile"
                          class="text-center text-success"
                        >{{(getTotal(outcome.lines).total) | currency}}</h5>
                        <h3
                          v-else
                          class="text-center text-success"
                        >{{(getTotal(outcome.lines).total) | currency}}</h3>
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
import store from '../../store/store.js';
import isMobile from '../../assets/js/isMobile.js';

import errorModal from '@/pages/Dashboard/Components/errorModal.vue';
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
      outcomes: [],
      value: null,
      loading: false,
      isMobile: null
    };
  },

  methods: {
    ...mapActions({
      getAllOutcomes: 'incomes/getAllIncomes'
    }),
    ...mapMutations({
      hideShowBottom: 'HIDE_SHOW_BOTTOM',
      cleanItem: 'items/CLEAN',
      sliceIcome: 'incomes/SLICE_INCOME'
    }),

    handleBottomNav(state) {
      this.cleanItem();
    },
    get_clientName(responsable) {
      if (
        responsable.type == 'User' ||
        responsable.type == 'Contact' ||
        responsable.type == 'Business'
      ) {
        return responsable.data.name;
      } else {
        return responsable.name;
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
            this.$router.push('/outcomes');
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/user',
      getErrors: 'incomes/getErrors',
      getOutcomes: 'incomes/getIncomes',
      getBusinessScope: 'getBusinessScope',
      getCurrencyConfig: 'getCurrencyConfig'
    }),
    ...mapState({
      outcomesGetParams: 'incomesGetParams'
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
      this.loading = true;
      this.getAllOutcomes({
        params: `${this.outcomesGetParams}`,
        type: 'out',
        isBusiness: data
      })
        .then(res => {
          this.outcomes = res;
          this.loading = false;
        })
        .catch(err => {
          console.log('this.getErrors --> ', this.getErrors);
        });
    });
  },

  watch: {
    outcomesGetParams: function() {
      this.getAllOutcomes(`${this.outcomesGetParams}`);
    },
    getBusinessScope: function(val) {
      this.getAllOutcomes({
        params: `${this.outcomesGetParams}`,
        type: 'out',
        isBusiness: val._id ? '/' + this.getBusinessScope._id : ''
      });
    }
  },
  beforeRouteEnter: (to, from, next) => {
    store.commit('HANDLE_ISOUTCOME', true);
    next();
  },

  beforeRouteLeave(to, from, next) {
    store.commit('HANDLE_ISOUTCOME', false);
    next();
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
</style>
