<template>
  <div class="q-pa-md account">
    <div class="login-form q-pa-lg">
        <h2 color="grey">{{ $t('accounts' )}} <small> {{ $t('accountTitle' )}}</small></h2>
        <q-card class="q-pa-md q-mt-md">
            <q-btn color="primary float-right q-mb-md"  @click="newAccount = true" text-color="white" icon="add">{{ $t('createAccountButton') }}</q-btn>
            <q-card-section class="row full">
              <div v-for="(data, index) in account" :key="index" class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 q-mt-lg">
                <q-card class="q-mr-md">
                    <q-card-section class="account-header">
                        <!-- <q-btn class="absolute-top-right" style="width: 45px" unelevated icon="edit"></q-btn> -->
                        <div>
                            <h3>{{data.MtLogin}} <span class="float-right"> #{{index+1}}</span></h3>
                            <!-- <label color="textGrey">{{ data.Credit }} {{data.Currency}} Credit</label> -->
                        </div>
                        <div>
                            <b class="amount">{{data.Balance}} <span>{{data.BaseCurrency}}</span></b>
                            <label color="textGrey">{{ $t('balance') }}</label>
                        </div>
                    </q-card-section>
                    <q-card-section class="account-info">
                      <div class="row">
                        <div class="col-sm-6">
                          <label>{{data.Credit}} {{data.Currency}}</label>
                          <p>{{ $t('credit') }}</p>
                        </div>
                        <div class="col-sm-6">
                          <label>{{data.Equity}} {{data.Currency}}</label>
                          <p>{{ $t('equity') }}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <label>{{data.Pnl}} {{data.Currency}}</label>
                          <p>{{ $t('pnl') }}</p>
                        </div>
                        <div class="col-sm-6">
                          <label v-if="data.IsDemo">Demo</label>
                          <label v-else>Live</label>
                          <p>{{ $t('type') }}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                        <!-- <label><span>TEMP-5ea44d14d8fc6TEMP-5ea44</span> <b class="shadow-1">TEMP-5ea44d14d8fc6TEMP-5ea44d14d8fc6</b></label>
                        <p>{{ $t('account') }}</p> -->
                          <label>{{data.MtServerType}}</label>
                          <p>{{ $t('platform') }}</p>
                        </div>
                        <div class="col-sm-6">
                          <label>{{data.Leverage}}</label>
                          <p>{{ $t('leverage') }}</p>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card class="account-footer q-pa-sm">
                        <q-btn to="/funds" color="primary q-mr-sm" text-color="white"> {{ $t('fundNow')}}</q-btn>
                    </q-card>
                </q-card>
              </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="newAccount" class="col-sm-6">
          <q-card  style="width: 600px; max-width: 80vw;">
            <q-form ref="createAccount" @submit.prevent="loading" @submit="createAccount" class="q-pa-lg">
                <h5 color="primary">Create New Account</h5>
                <q-input
                  label="Leverage"
                  type="number"
                  v-model="Leverage"
                  required
                />
                <q-select
                  :options="this.Currency"
                  option-value="id"
                  required
                  option-label="name"
                  v-model="CurrencyId"
                  label="Currency">
                </q-select>
                <q-select
                  :options="this.MtServer"
                  option-value="id"
                  required
                  option-label="name"
                  v-model="MetaServerType"
                  label="Trading Platform Type">
                </q-select>
                <q-btn type="submit" :loading="submitting" color="primary" class="q-mt-md" label="Create">
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                </q-btn>
            </q-form>
          </q-card>
        </q-dialog>

    </div>
  </div>
</template>

<script>
import { catchAxiosError } from '../../lib/cmn/axios'

export default {
  name: 'Account',

  mounted: function () {
    this.getAccountList()
  },

  data () {
    return {
      account: {},
      newAccount: false,
      MetaServerType: null,
      Leverage: null,
      submitting: false,
      CurrencyId: null,
      Currency: [{ id: 252, name: 'USD' }, { id: 93, name: 'EUR' }, { id: 49, name: 'GBP' }, { id: 237, name: 'CHF' }],
      MtServer: [{ id: 'mt5', name: 'MT5 (Forex, CFDs on Stocks, Equity Indices, Metals, Energies)' }, { id: 'mt5', name: 'MT4 (Forex, CFDs on Equity Indices, Metals, Energies)' }]
    }
  },

  methods: {
    loading (type) {
      this.submitting = true
    },
    getAccountList: function () {
      this.$axios.get('/account/list', {})
        .then((response) => {
          if (response.data.Data) {
            this.account = response.data.Data
          } else {
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    },
    createAccount: function () {
      var data = {
        MetaServerType: this.MetaServerType.id,
        CurrencyId: this.CurrencyId.id,
        Leverage: JSON.parse(this.Leverage)
      }
      this.$axios.post('/account', data)
        .then((response) => {
          this.submitting = false
          if (response.data.Data) {
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Your account has been created.',
              icon: 'check'
            })
            window.location.reload()
          } else {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'We are sorry we are not able to create your account right now.',
              icon: 'report_problem'
            })
          }
          this.newAccount = false
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    }
  }
}
</script>
<style scoped>
  .row.full {
    width: 100%;
  }
</style>
