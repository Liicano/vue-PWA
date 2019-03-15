<template>
  <div>
    <div v-if="loading">
      <center>
        <spinner v-if="loading"></spinner>
      </center>
    </div>

    <div class="md-layout" v-else>
      <div class="md-layout-item md-size-100" style="padding:0" v-if="getItems.docs">
        <v-list two-line>
          <v-subheader>Mis items</v-subheader>
          <template v-for="(item, index) in getItems.docs.slice().reverse()">
            <router-link :to="{path:'/item/' + item._id}" :key="item._id">
              <v-list-tile :key="item.title" avatar color="green">
                <v-list-tile-content>
                  <v-list-tile-title class="black--text">{{ item.name | capitalize }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ (item.price) ? item.price : '00' | currency }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{(item.tax[0])? item.tax[0].name : 'SIN IMPUESTO'}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ (item.quantity) ? item.quantity : '00' }}</v-list-tile-action-text>
                  <v-icon>description</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </router-link>
            <v-divider v-if="index + 1 < getItems.docs.length" :key="index"></v-divider>
          </template>
        </v-list>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import spinner from '../Dashboard/Components/spinner';

export default {
  data() {
    return {
      loading: true
    };
  },
  components: {
    spinner
  },

  mounted() {
    this.getAllItems().then(res => {
      this.loading = false;
      console.log(res);
    });
  },
  methods: {
    ...mapActions({
      getAllItems: 'items/getAllItems'
    })
  },
  computed: {
    ...mapGetters({
      getItems: 'items/getItems'
    })
  }
};
</script>
<style>
</style>
