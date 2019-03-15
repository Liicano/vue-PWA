<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">Register</h2>
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto"
          slot="content-left"
        >
          <div class="info info-horizontal" v-for="item in contentLeft" :key="item.title">
            <div :class="`icon ${item.colorIcon}`">
              <md-icon>{{ item.icon }}</md-icon>
            </div>
            <div class="description">
              <h4 class="info-title">{{ item.title }}</h4>
              <p class="description">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto"
          slot="content-right"
        >
          <!-- <div class="social-line text-center">
            <Gauth from="register"></Gauth>
    
            <h4 class="mt-3">{{ lg.user.classic }}</h4>
          </div>-->
          <!-- <md-field class="md-form-group" >
            <md-icon>face</md-icon>
            <md-input v-model="name" type="email" :placeholder="lg.user.name"></md-input>
          </md-field>
          
          <md-field class="md-form-group" >
            <md-icon>edit</md-icon>
            <md-input v-model="username" type="text" :placeholder="lg.user.username"></md-input>
          </md-field>-->
          <md-field class="md-form-group">
            <md-icon>person</md-icon>
            <md-input
              v-validate="'alpha|required'"
              v-model="name"
              type="text"
              :placeholder="lg.user.name"
              name="name"
            ></md-input>
          </md-field>
          <span class="text-danger">{{ errors.first('name') }}</span>
          <md-icon v-if="errors.first('name')" class="left text-danger">warning</md-icon>

          <!-- <md-field class="md-form-group" >
            <md-icon>sort_by_alpha</md-icon>
            <md-input v-model="username" type="text" :placeholder="lg.user.username"></md-input>
          </md-field>-->
          <md-field class="md-form-group">
            <md-icon>email</md-icon>
            <md-input
              v-validate="'email|required'"
              v-model="email"
              name="email"
              type="email"
              :placeholder="lg.user.email"
            ></md-input>
          </md-field>
          <span class="text-danger">{{ errors.first('email') }}</span>
          <md-icon v-if="errors.first('email')" class="left text-danger">warning</md-icon>

          <!-- <md-field class="md-form-group" >
            <md-icon>lock</md-icon>
            <md-input v-model="password" type="password" :placeholder="lg.user.password"></md-input>
          </md-field>-->
          <md-checkbox v-model="terms" @click="terms = !terms;">
            {{ lg.base.term1 }}
            <a to="/terms">{{ lg.base.term2 }}</a>.
          </md-checkbox>
          <div class="button-container">
            <md-button
              href
              class="md-success md-round mt-4"
              slot="footer"
              @click="register"
            >{{lg.user.register}}</md-button>
          </div>
          <div class="button-container">
            <md-button
              href
              class="md-success md-round mt-4"
              slot="footer"
              to="/login"
            >{{lg.user.haveAccount}}</md-button>
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import { SignupCard, Gauth } from '@/components';

export default {
  name: 'Register',
  components: {
    SignupCard,
    Gauth
  },
  data() {
    return {
      name: null,
      username: null,
      terms: false,
      email: null,
      password: null,
      contentLeft: [
        {
          colorIcon: 'icon-success',
          icon: 'timeline',
          title: 'Marketing'
          // description:
          //   "We've created the marketing campaign of the website. It was a very interesting collaboration."
        },
        {
          colorIcon: 'icon-danger',
          icon: 'code',
          title: 'Fully Coded in HTML5'
          // description:
          //   "We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
        },
        {
          colorIcon: 'icon-info',
          icon: 'group',
          title: 'Built Audience'
          // description:
          //   'There is also a Fully Customizable CMS Admin Dashboard for this product.'
        }
      ],
      inputs: [
        {
          icon: 'face',
          name: this.lg.user.name,
          nameAttr: 'name',
          type: 'text'
        },
        {
          icon: 'email',
          name: this.lg.user.email,
          nameAttr: 'email',
          type: 'email'
        }
        // { icon: 'lock_outline',
        //   name: 'Password..',
        //   nameAttr: 'password',
        //   type: 'password' }
      ]
    };
  },
  methods: {
    register() {
      if (this.name != null && this.email != null) {
        if (!this.terms) {
          this.$toasted.show('Debes aceptar los terminos y condiciones!', {
            type: 'info'
          });
        } else {
          if (this.errors.items.length > 0) {
            this.$toasted.show('Uno o mas campos erroneos!');
          } else {
            let { email, name, username, password } = this;
            this.$store
              .dispatch('users/register', {
                email,
                name,
                username,
                password
              })
              .then(r => {
                this.$router.push('/login');

                this.$toasted.show('Verifica tu correo y activa tu cuenta!', {
                  type: 'info'
                });
              })
              .catch(err => {
                //err.status  & err.statusText
                console.warn(err);
                console.warn(err.response);
                console.warn(err.statusText);
                let status = err.status || err.response.status;
                let type = new Map();
                type.set(403, 'warning');
                type.set(404, 'danger');
                type.set(500, 'danger');
                type.set(401, 'info');
                type.set(409, 'warning');
                this.$toasted.show(
                  ' ' + err.statusText || err.response.data.msg + ' ',
                  { type: type.get(status) }
                );
              });
          }
        }
      } else {
        this.$toasted.show('Uno o mas campos vacios!', { type: 'danger' });
      }
    }
  }
};
</script>
<style scoped>
.u-icon-container {
  padding: 8px;
}
</style>