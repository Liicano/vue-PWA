<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="getBottomModalState">
      <v-list :class="[(isMobile == true) ? '' : 'onDesktop']">
        <v-subheader
          v-if="(config.title && config.title != '' && config.title != null)"
        >{{config.title}}</v-subheader>
        <v-list-tile
          v-for="(tile, index) in config.options"
          :key="tile.title"
          @click="action(index, tile.params)"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img :src="getImg(tile.img)" :alt="tile.title">
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title style="color: black;">{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import isMobile from '../../../assets/js/isMobile.js';
export default {
  props: {
    config: null,
    option_0: null,
    option_1: null,
    option_2: null
  },
  data: () => ({
    display: null,
    isMobile: null
  }),
  methods: {
    action(index, params) {
      this.$emit(`option_${index}`, params);
      this.showSheet = false;
    },
    getImg(img) {
      return require(`../../../assets/img/${img}`);
    }
  },
  mounted() {
    this.isMobile = isMobile;
  },

  computed: {
    ...mapGetters({
      getBottomModalState: 'getBottomModalState'
    })
  }
};
</script>

<style>
.onDesktop {
  margin-left: 6% !important;
}

.noDesktop {
  margin-left: 0 !important;
}
</style>
