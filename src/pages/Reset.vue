<template>
  <div class="row absolute-full q-pa-xl login-container">
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 login-form q-pa-lg">
        <q-card>
        <q-card-section>
            <img alt="NYFX logo" src="~assets/nyfx-logo.svg" height="56px"/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="loading" @submit="update" class="q-gutter-y-md">
            <q-input v-model="password" color="white" text-color="white" dark label="New Password">
            </q-input>
            <q-input v-model="password2" color="white" text-color="white" dark label="Password Confirmation" :type="ptype" @keypress.enter="update">
            </q-input>
            <q-btn color="white" type="submit" :loading="submitting" text-color="primary" class="full-width" label="Update Password" >
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
            <a to="/reset-password" flat no-caps class="center">Forgot password?</a>
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
// import { catchAxiosError } from '../lib/cmn/axios'

export default {
  name: 'PageLogin',
  data: function () {
    return {
      password: '',
      password2: '',
      submitting: false
    }
  },
  computed: {},
  methods: {
    loading: function () {
      this.submitting = true
    },
    update: function () {
    }
  }
}
</script>
