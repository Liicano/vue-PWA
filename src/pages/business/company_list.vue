<template>
  <div>
    <div v-if="loading">
      <spinner></spinner>
    </div>
    <div v-else>
      <div class="md-layout" v-if="(getBusiness && getBusiness.docs.length > 0)">
        <div class="md-layout-item md-small-size-100" style="padding:0;">
          <md-list class="md-triple-line" style="padding:0;">
            <md-list-item
              style="padding:0;cursor:pointer"
              v-for="company in getBusiness.docs"
              :key="company._id"
            >
              <md-avatar>
                <img src="../../../public/img/logotipo.png" alt="People">
              </md-avatar>

              <router-link
                :to="{path:'/user/company/'+company._id}"
                tag="div"
                class="md-list-item-text"
              >
                <span>{{company.name}}</span>
              </router-link>
            </md-list-item>
          </md-list>
        </div>
      </div>

      <center v-else>
        <md-empty-state
          md-icon="domain"
          md-label="Aun no registras una empresa"
          md-description="Crea tu primera empresa desde aqui"
        >
          <router-link
            :to="{path:'/user/company'}"
            class="md-success md-raised md-simple"
            tag="md-button"
          >Nueva empresa</router-link>
        </md-empty-state>
      </center>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import spinner from '../Dashboard/Components/spinner';

export default {
  name: 'Business',
  data: () => ({
    loading: true
  }),
  components: {
    spinner
  },
  methods: {
    ...mapActions({
      getAllBusiness: 'business/getAllBusiness'
    })
  },
  created() {},
  mounted() {
    this.getAllBusiness().then(res => {
      this.loading = false;
      console.log('this.getBusiness -> ', this.getBusiness.docs);
    });
  },
  computed: {
    ...mapGetters({
      getBusiness: 'business/getBusiness'
    })
  }
};
</script>

<style lang="scss" scoped>
</style>