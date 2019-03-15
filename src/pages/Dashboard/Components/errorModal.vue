  <template>
  <div>
    <!-- MODAL DE ERROR -->
    <modal v-if="errorModal" @close="errorModal = false">
      <template slot="header"></template>

      <template slot="body">
        <center>
          <h3>Upss!</h3>
          <h1>
            <md-avatar class="md-avatar-icon md-danger md-accent md-large">
              <md-icon>error</md-icon>
            </md-avatar>
          </h1>

          <p>
            <b>Se presento un error:</b>
          </p>
          <p>Le pedimos disculpas por el inconveniente</p>
          <ul>
            <li class="text-danger">{{error.message}}</li>
          </ul>
        </center>
      </template>

      <template slot="footer">
        <router-link :to="{path:'/dashboard'}">
          <md-button class="md-simple">Ir al inicio</md-button>
        </router-link>
        <md-button class="md-danger md-simple" @click="logout">Cerrar sesion</md-button>
      </template>
    </modal>
  </div>
</template>
  <script>
import { Modal } from '@/components';

export default {
  props: {
    errorObject: {}
  },

  components: {
    Modal
  },

  data() {
    return {
      errorModal: true,
      error: {}
    };
  },

  created() {
    this.error = this.errorObject;
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout').then(res => {
        this.$router.push('/');
      });
    }
  }
};
</script>
  <style>
</style>
