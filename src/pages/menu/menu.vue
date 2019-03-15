<template>
  <div>
    <br>
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <v-card color="green " class="white--text">
          <v-layout>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">ITEMS</div>
                  <div>Catalogo de items</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5 align-self-center>
              <center>
                <v-badge overlap color="blue darken-2">
                  <!-- <span slot="badge">14</span> -->
                  <v-avatar color="green red--after">
                    <v-icon dark>assignment</v-icon>
                  </v-avatar>
                </v-badge>
              </center>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <router-link to="/items">
            <v-card-actions class="pa-3 white--text">
              <v-spacer></v-spacer>IR A CATALOGO
            </v-card-actions>
          </router-link>
        </v-card>
      </div>
    </div>
    <br>

    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <v-card color="blue darken-3 " class="white--text">
          <v-layout>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">BANDEJA</div>
                  <div>Bandeja de notificaciones</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5 align-self-center>
              <center>
                <v-badge overlap color="blue darken-2">
                  <!-- <span slot="badge">14</span> -->
                  <v-avatar color="blue darken-3 red--after">
                    <v-icon dark>message</v-icon>
                  </v-avatar>
                </v-badge>
              </center>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <router-link to="/imbox">
            <v-card-actions class="pa-3 white--text">
              <v-spacer></v-spacer>IR A BANDEJA
            </v-card-actions>
          </router-link>
        </v-card>
      </div>
    </div>
    <br>
    <!-- 
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <v-card color="blue accent-3" class="white--text">
          <v-layout>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">OPCION 2</div>
                  <div>Opcion numero 2</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5 align-self-center>
              <center>
                <v-badge overlap color="blue darken-2">
                  
                  <v-avatar color="blue accent-3">
                    <v-icon dark>star</v-icon>
                  </v-avatar>
                </v-badge>
              </center>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <router-link to="/items">
            <v-card-actions class="pa-3 white--text">
              <v-spacer></v-spacer>IR A OPCION
            </v-card-actions>
          </router-link>
        </v-card>
      </div>
    </div>-->
    <!-- <br>
    <center>
      <div class="md-layout">
        <div class="md-layout-item md-size-33">
          <center>
            <router-link to="/items">
              <v-btn fab dark large color="green darken-2">
                <v-icon dark>list_alt</v-icon>
              </v-btn>
            </router-link>
            <h5 style="margin-top: 0px;">Items</h5>
          </center>
        </div>
      </div>
    </center>-->
    <!-- <br>
    <br>
    <br>-->
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {};
  },

  created() {},
  methods: {}
};
</script>
<style>
</style>
