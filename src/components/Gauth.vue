<template>
  <!-- <center> -->
  <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
    <!-- <i class="fab fa-google-plus-g">Login </i> -->
    <!-- <div class="google"> -->
    <img src="../assets/img/google/btn_google_light_normal_ios.svg" alt width="32px" height="32px">
    <!-- <span>{{lg.user.signin +' ' + lg.user.googleLogin}}</span> -->
    <!-- </div> -->
    <!-- <strong> {{ from }} {{ lg.user.googleLogin }}</strong> -->
  </g-signin-button>
  <!-- </center> -->
</template>
 
<script>
import locale from '../languages';
import spinner from '../../src/pages/Dashboard/Components/spinner';
export default {
  name: 'Gauth',
  props: {
    from: ''
  },
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          '911992056725-uno0u77p6vc770gnv30jmr9t7bl6hhk8.apps.googleusercontent.com',
        scope: 'profile email https://www.googleapis.com/auth/calendar openid'
      },
      loading: false
    };
  },

  components: {
    spinner
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      //eslint-disable-next-line
      const profile = googleUser.getBasicProfile(); // etc etc
      const token = googleUser.getAuthResponse().id_token;
      const access_token = googleUser.getAuthResponse().access_token;
      // eslint-disable-next-line
      // console.log(id_token);
      // console.log(profile);
      // console.log(profile.getFamilyName());
      // console.log(profile.getGivenName());

      // console.log(profile.getId());
      // console.log(profile.getImageUrl());
      // console.log(profile.getName());

      // console.log(profile.getEmail());
      // console.log(googleUser.getAuthResponse().access_token);

      const google = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        accessToken: access_token,
        imgUrl: profile.getImageUrl()
      };
      let router = this.$router;
      if (this.from === 'login') {
        this.loading = true;

        this.$store
          .dispatch('users/google', { token, access_token, google })
          // eslint-disable-next-line
          .then(data => {
            this.loading = false;

            router.push('/');
          })
          .catch((err, response) => {
            if (response.status === 404) {
              this.$router.push('/register');
            }
          });
      } else if (this.from === 'register') {
        this.$store
          .dispatch('users/googleNew', { token, googleUser })
          // eslint-disable-next-line
          .then(data => {
            router.push('/');
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      // eslint-disable-next-line
      console.log(error);
      this.$toasted.show(' ' + error.error + ' ', { type: 'danger' });
    }
  }
};
</script> 
 
<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  /* display: inline-block; */
  /* padding: 4px 8px; */
  /* border-radius: 10px; */
  /* background-color: #3c82f7; */
  color: #3c82f7;
  /* box-shadow: 0 3px 0 #0f69ff; */
  /* margin: auto; */
  cursor: pointer;
}
/* .google { */
/* border: 1px solid lightblue;
  border-radius: 5px; */
/* } */
.google img {
  width: 5rem;
  height: 5rem;
}
</style> 