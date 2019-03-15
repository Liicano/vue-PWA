<template>
  <div class="user">
    <div class="photo">
      <img src="../../../../assets/img/company_icon.png" alt>
    </div>

    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          Mis empresas
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav" v-if="getBusiness.docs">
            <slot v-if="getBusiness.docs.length > 0">
              <li @click="$router.push('/user/company')">
                <a>
                  <md-icon>business</md-icon>
                  <span class="sidebar-normal">
                    <b>Nueva empresa +</b>
                  </span>
                </a>
              </li>

              <br>
              <md-divider style="color:white"></md-divider>

              <li
                @click="clean_businessScope(); currentIndex(null)"
                v-if="getBusiness.docs.length > 0"
              >
                <a>
                  <md-icon>person_pin</md-icon>
                  <span class="sidebar-normal">
                    <b>Volver a mi unabase</b>
                  </span>
                </a>
              </li>
              <li
                v-for="(company, index) in getBusiness.docs"
                :key="company._id"
                @click="setBusiness(company);currentIndex(index)"
              >
                <a>
                  <md-icon>business</md-icon>
                  <span :class="{'sidebar-normal': true, 'text-success': currentClass}">
                    <b>{{company.name}}</b>
                  </span>
                </a>
              </li>
            </slot>
            <slot v-else>
              <li>
                <a href="/user/company">
                  <md-icon>business</md-icon>
                  <span class="sidebar-normal text-success">
                    <b>Registrar empresa +</b>
                  </span>
                </a>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { CollapseTransition } from 'vue2-transitions';
// import { mapGetters } from 'vuex';

export default {
  components: {
    CollapseTransition
  },
  props: {},
  data() {
    return {
      isClosed: true,
      currentClass: false
    };
  },
  computed: {
    ...mapGetters({
      getBusiness: 'business/getBusiness',
      getBusinessScope: 'getBusinessScope',
      getUser: 'users/user'
    })
  },
  mounted() {
    console.log(localStorage);
    console.log(this.getBusiness);
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    },

    setBusiness(company) {
      console.log(company);
      this.changeBusiness(company);
      this.$toasted.show('<b>' + this.getBusinessScope.name + '</b>');
    },
    clean_businessScope() {
      this.changeBusiness({});
      this.$toasted.show('' + this.getUser.name + '');
    },
    currentIndex(index) {
      if (index != null) {
        this.currentClass = true;
      } else {
        this.currentClass = false;
      }
    },

    ...mapMutations({
      changeBusiness: 'CHANGE_BUSINESS'
    })
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
.photo {
  background-color: white;
}
</style>
