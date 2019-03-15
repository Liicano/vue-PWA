<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-button
        :class="'md-large '+`${colorClass}`"
        id="bottomButton"
        @click="clickEvent"
        style="z-index: 1000 !important;"
      >{{buttonName}}</md-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import swal from 'sweetalert2';

export default {
  props: {
    colorClass: null,
    buttonName: null
  },

  data() {
    return {};
  },

  components: {
    swal
  },
  methods: {
    clickEvent() {
      this.$emit('clickFunction');
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped>
#bottomButton {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
