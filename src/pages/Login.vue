<template>
  <div class="row absolute-full q-pa-xl login-container">
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 login-form q-pa-lg">
        <q-card>
        <q-card-section>
            <img alt="NYFX logo" src="~assets/nyfx-logo.svg" height="56px"/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="loading" @submit="login" class="q-gutter-y-md">
            <q-input v-model="username" color="white" text-color="white" dark label="Username">
                <template v-slot:append>
                <q-icon name="mdi-account"/>
                </template>
            </q-input>
            <q-input v-model="password" color="white" text-color="white" dark label="Password" :type="ptype" @keypress.enter="login">
                <template v-slot:append>
                <q-icon :name="picon" @click="pclick"></q-icon>
                </template>
            </q-input>
            <q-btn color="white" type="submit" :loading="submitting" text-color="primary" class="full-width" label="Login" >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
            </q-btn>
          </q-form>
        </q-card-section>
        </q-card>
        <div class="links">
            <div class="text-center full-width">Not yet a client?
                <router-link to="/signup">Sign up here.</router-link>
            </div>
            <router-link to="/reset-password" flat no-caps class="center">Forgot password?</router-link>
        </div>
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 login-info-box">
        <div class="container q-pa-xl">
            <h2>Ask about our Smart <br>Trader tools package</h2>
            <p>28 indicators and expert advisors for MT4 and MT5, designed to help you manage your risk and take your trading to the next level. Find out more.</p>
        </div>
    </div>
  </div>
</template>

<script>
import { catchAxiosError } from '../lib/cmn/axios'

export default {
  name: 'PageLogin',
  data: function () {
    return {
      username: '',
      password: '',
      ptype: 'password',
      picon: 'mdi-eye-off',
      rememberme: false,
      submitting: false
    }
  },
  computed: {},
  methods: {
    loading: function () {
      this.submitting = true
    },
    pclick: function () {
      if (this.ptype === 'password') {
        this.ptype = 'text'
        this.picon = 'mdi-eye'
      } else {
        this.ptype = 'password'
        this.picon = 'mdi-eye-off'
      }
    },
    login: function () {
      this.$axios.post('/login', {
        Email: this.username,
        Password: this.password
      })
        .then((response) => {
          this.submitting = false
          if (response.data.Success) {
            setTimeout(() => {
              this.$store.commit('session/setLogin', { data: response.data.Data, write: true })
              this.$router.push('/')
            }, 1000)
          } else {
            // todo: notify yerine hata mesajı verelim
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Geçersiz kullanıcı adı veya şifre',
              icon: 'report_problem'
            })
          }
        })
        .catch((error) => {
          this.submitting = false
          catchAxiosError(error)
        })
    }
  }
}
</script>
