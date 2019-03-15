<template>
  <div>
    <notifications></notifications>

    <div class="container-fluid" style="background: #fafafa;">
      <router-view></router-view>
    </div>

    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: []
    };
  },

  created() {},

  methods: {},
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    }
  }
};
</script>

<style>
.md-field:after,
.md-field:before {
  display: none;
}

#bottom_navbar {
  width: 100%;
}

.phone-viewport {
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 60px !important;
}

@media (min-width: 618px) {
  #bottom_navbar {
    display: none;
  }
}

.md-badge {
  position: absolute;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 60%;
  font-size: 10px;
  font-style: normal;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
  z-index: 6;
}
.md-menu-content {
  z-index: 100;
}

.md-big-hide {
  display: none;
}
@media (max-width: 618px) {
  .md-big-hide {
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
      Data: []
    };
  },

  created() {},

  methods: {},
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    }
  }
};
</script>
