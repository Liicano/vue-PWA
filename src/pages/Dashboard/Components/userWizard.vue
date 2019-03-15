<template>
  <div>
    <!-- MODAL DE ERROR -->
    <div v-if="!inMobile">
      <modal v-if="wizardModal" @close="wizardModal = false">
        <template slot="header">
          <slide-y-up-transition :duration="700">
            <div>
              <center>
                <h2>
                  <b>Bienvenido</b>
                </h2>
                <img :src="getUser.imgUrl" alt class="circle">
                <p>{{getUser.name}}</p>
                <h5>
                  Completa tu perfil y disfruta de lo que
                  <label class="text-success">unabase</label> tiene para ofrecerte
                </h5>
              </center>
            </div>
          </slide-y-up-transition>
        </template>

        <template slot="body" style="padding: 24px 5px 30px !important;">
          <md-content class="md-scrollbar" style="max-width: 100%;">
            <md-steppers md-vertical md-linear :md-active-step.sync="active">
              <md-step
                class
                id="first"
                md-label="Documentos"
                md-description="Emision de documentos"
                :md-editable="true"
                @click="setDone('first', 'first')"
              >
                <center>
                  <h4>¿Emites algun tipo de documento?</h4>
                  <div class="md-layout">
                    <div class="md-layout-item md-size-50">
                      <md-radio v-model="userConfig.documents" :value="true">Si</md-radio>
                    </div>
                    <div class="md-layout-item md-size-50">
                      <md-radio v-model="userConfig.documents" :value="false">No</md-radio>
                    </div>
                  </div>
                  <br>
                  <md-button
                    class="md-raised md-success"
                    @click="setDone('first', 'second')"
                  >Siguiente</md-button>
                </center>
              </md-step>

              <md-step
                id="second"
                md-label="Documento de identidad"
                md-description="Documentos personales"
                :md-error="secondStepError"
                :md-editable="true"
              >
                <center>
                  <md-field>
                    <label>RUT</label>
                    <md-input v-model="userConfig.idNumber"></md-input>
                    <span class="md-helper-text text-success">Valido</span>
                  </md-field>
                  <md-button
                    class="md-raised md-success"
                    @click="setDone('second', 'third')"
                  >Siguiente</md-button>
                </center>
              </md-step>
            </md-steppers>
          </md-content>
        </template>
        <template slot="footer">
          <center>
            <md-button class="md-raised md-success" @click="saveConfig()">Guardar</md-button>
          </center>
        </template>
      </modal>
    </div>

    <div v-if="inMobile">
      <md-dialog :md-active.sync="wizardModal">
        <div class="md-layout">
          <div class="md-layout-item md-size-45 md-small-size-100" style="padding: 0">
            <span slot>
              <slide-y-up-transition :duration="700">
                <div>
                  <!--v-show="showHeader"-->
                  <center>
                    <h2>
                      <b>Bienvenido</b>
                    </h2>
                    <img :src="getUser.imgUrl" alt class="circle">

                    <p>{{getUser.name}}</p>
                    <h5>
                      Completa tu perfil y disfruta de lo que
                      <label class="text-success">unabase</label> tiene para ofrecerte
                    </h5>
                  </center>
                </div>
              </slide-y-up-transition>
            </span>

            <div slot style="padding: 24px 5px 30px !important;">
              <md-content class="md-scrollbar" style="max-width: 100%;">
                <md-steppers md-vertical md-linear :md-active-step.sync="active">
                  <md-step
                    class
                    id="first"
                    md-label="Documentos"
                    md-description="Emision de documentos"
                    :md-editable="true"
                    @click="setDone('first', 'first')"
                  >
                    <center>
                      <h4>¿Emites algun tipo de documento?</h4>
                      <div class="md-layout">
                        <div class="md-layout-item md-size-50">
                          <md-radio v-model="userConfig.documents" :value="true">Si</md-radio>
                        </div>
                        <div class="md-layout-item md-size-50">
                          <md-radio v-model="userConfig.documents" :value="false">No</md-radio>
                        </div>
                      </div>
                      <br>
                      <md-button
                        class="md-raised md-success"
                        @click="setDone('first', 'second')"
                      >Siguiente</md-button>
                    </center>
                  </md-step>

                  <md-step
                    id="second"
                    md-label="Documento de identidad"
                    md-description="Documentos personales"
                    :md-error="secondStepError"
                    :md-editable="true"
                  >
                    <center>
                      <md-field>
                        <label>RUT</label>
                        <md-input v-model="userConfig.idNumber"></md-input>
                        <span class="md-helper-text text-success">Valido</span>
                      </md-field>
                      <md-button
                        class="md-raised md-success"
                        @click="setDone('second', 'third')"
                      >Siguiente</md-button>
                    </center>
                  </md-step>
                </md-steppers>
              </md-content>
            </div>
          </div>
        </div>
        <md-dialog-actions>
          <dialog-button
            @clickFunction="saveConfig"
            :colorClass="'md-success'"
            :buttonName="'GUARDAR'"
          ></dialog-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
// import store from '../../../store/store.js'
import { Modal } from '@/components';
import { SlideYUpTransition } from 'vue2-transitions';
import dialogButton from '../Components/dialogButton';
import isMobile from '../../../assets/js/isMobile.js';

export default {
  props: {
    errorObject: {}
  },

  components: {
    Modal,
    SlideYUpTransition,
    dialogButton
  },

  data() {
    return {
      wizardModal: true,
      showHeader: true,
      active: 'none',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      userConfig: {
        documents: null,
        idNumber: null
      },
      inMobile: null
    };
  },

  created() {
    this.inMobile = isMobile;
    if (isMobile && this.$route.fullPath == '/dashboard') {
      this.hideButtomBar(false);
    }
  },
  methods: {
    ...mapMutations({
      hideButtomBar: 'HIDE_SHOW_BOTTOM'
    }),
    setDone(id, index) {
      this[id] = true;

      if (index) {
        this.active = index;
      }
      this.showHeader = false;
    },
    setError() {
      this.secondStepError = 'This is an error!';
    },
    saveConfig() {
      this.wizardModal = false;
      this.$router.push('/dashboard');
      this.hideButtomBar(true);
      console.log(this.userConfig);
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/user'
    }),
    ...mapState({
      BottomBar: 'showBottom'
    })
  }
};
</script>
<style>
.md-content {
  width: 100%;
  max-height: 60vh;
  overflow: auto;
}
.modal-body {
  padding: 24px 5px 30px !important;
}

.md-stepper-header {
  background-color: #01c73e !important;
}
</style>
