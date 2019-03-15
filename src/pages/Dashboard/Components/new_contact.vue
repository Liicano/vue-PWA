<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <center>
          <h3>{{(getContact.name)}}</h3>
        </center>
      </div>
    </div>

    <br>
    <small></small>
    <md-divider></md-divider>
    <br>
    <div class="md-layout">
      <div class="md-layout-item md-size-80">
        <md-field>
          <label>Email</label>
          <md-input
            type="email"
            name="email"
            :value="userName"
            @input.native="newContact($event.target);"
            @blur="getContactUser()"
          ></md-input>
        </md-field>
      </div>

      <div class="md-layout-item md-size-20 valign-wrapper">
        <center>
          <md-avatar>
            <img v-if="contact_img != null && !loading" :src="contact_img" alt="Avatar">
            <img
              v-if="contact_img == null && !loading"
              src="../../../../public/img/default-avatar.png"
              alt="Avatar"
            >
          </md-avatar>
        </center>
      </div>
    </div>
    <br>
    <center>
      <small>ó</small>
    </center>
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <md-field>
          <label>Telefono</label>
          <md-input type="text" name="phone" @input.native="newContact($event.target)"></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

export default {
  components: {},

  data() {
    return {
      contact_img: null,
      loading: false,
      userName: ''
    };
  },

  mounted() {
    if (this.validateEmail(this.getContact.name) == true) {
      this.userName = this.getContact.name;
      this.newContact({ name: 'email', value: this.userName });
    } else {
      this.userName = '';
    }
  },
  methods: {
    ...mapActions({
      postContact: 'contacts/postContact',
      findContact: 'contacts/findContact'
    }),
    ...mapMutations({
      setContact: 'contacts/SET_CONTACT'
    }),

    newContact(c) {
      let obj = {
        attr: c.name,
        value: c.value
      };

      this.setContact(obj);
    },

    getContactUser() {
      this.loading = true;
      this.findContact(this.getContact.email).then(res => {
        this.loading = false;

        this.contact_img = res.imgUrl;
        console.log(res);
      });
    },
    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/user',
      getContact: 'contacts/getContact'
    })
  }
};
</script>
<style>
</style>
