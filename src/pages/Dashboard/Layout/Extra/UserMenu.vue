<template>
  <div class="user">
    <div class="photo" v-if="user.imgUrl">
      <img v-if="getBusinessScope._id" src="../../../../assets/img/company_icon.png" alt>
      <img v-else :src="user.imgUrl" alt="avatar">
    </div>
    <div class="photo" v-else>
      <img src="../../../../assets/img/profile.png" alt="avatar">
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          <b>{{(getBusinessScope._id)?getBusinessScope.name:profile.name}}</b>
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <router-link tag="li" to="/user/profile">
                <a>
                  <md-icon>person</md-icon>
                  <span class="sidebar-normal">{{lg.user.profile}}</span>
                </a>
              </router-link>

              <li>
                <a href="/login" @click="logout">
                  <md-icon>exit_to_app</md-icon>
                  <span class="sidebar-normal">{{lg.user.logout}}</span>
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
import { CollapseTransition } from 'vue2-transitions';
import { mapGetters } from 'vuex';

export default {
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    rtlTitle: {
      type: String,
      default: 'تانيا أندرو'
    },
    avatar: {
      type: String,
      default: './img/faces/avatar.jpg'
    }
  },
  data() {
    return {
      isClosed: true,
      name: '',
      profile: {}
    };
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
      getBusinessScope: 'getBusinessScope'
    })
  },
  created() {
    this.profile.name = this.user.name || this.user.username;
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    },
    logout() {
      this.$store
        .dispatch('users/logout')

        .then(res => {
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
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
