<template>
  <div class="row absolute-full q-pa-xl login-container">
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 login-form q-pa-lg">
        <q-card>
          <q-card-section>
            <img alt="NYFX logo" src="~assets/nyfx-logo.svg" height="56px"/>
            <q-form @submit.prevent="sign" ref="signUp" class="q-gutter-y-md sign-up">
                <div class="row">
                  <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.FirstName.$error }">
                    <q-input
                      v-model="$v.FirstName.$model"
                      v-model.trim="$v.FirstName.$model"
                      color="white"
                      text-color="white"
                      dark
                      label="First name">
                    </q-input>
                    <div class="error" v-if="!$v.FirstName.required">Field is required</div>
                  </div>
                  <div class="col-sm-6" :class="{ 'form-group--error': $v.LastName.$error }">
                    <q-input
                      v-model="$v.LastName.$model"
                      v-model.trim="$v.LastName.$model"
                      color="white"
                      text-color="white"
                      dark
                      label="Last name">
                    </q-input>
                    <div class="error" v-if="!$v.LastName.required">Field is required</div>
                  </div>
                </div>
                <div :class="{ 'form-group--error': $v.Email.$error }">
                  <q-input
                    type="email"
                    v-model="$v.Email.$model"
                    v-model.trim="$v.Email.$model"
                    @blur="handleEmailBlur"
                    @input="handleEmailChange"
                    color="white"
                    text-color="white"
                    dark
                    label="Email">
                  </q-input>
                  <div class="error" v-if="!$v.Email.required">Field is required</div>
                  <div class="error show" v-if="isUnique">This email is already registered.</div>
                </div>
                <div :class="{ 'form-group--error': $v.Password.$error }">
                  <q-input
                    type="password"
                    v-model="$v.Password.$model"
                    v-model.trim="$v.Password.$model"
                    color="white"
                    text-color="white"
                    dark
                    label="Password">
                  </q-input>
                  <div class="error" v-if="!$v.Password.required">Field is required</div>
                </div>
                <div class="row">
                  <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.Phone.$error }">
                    <q-input
                      class="col-sm-6 q-pr-md"
                      v-model="$v.Phone.$model"
                      v-model.trim="$v.Phone.$model"
                      color="white"
                      text-color="white"
                      dark
                      label="Phone">
                    </q-input>
                    <div class="error" v-if="!$v.Phone.required">Field is required</div>
                  </div>
                  <div class="col-sm-6" :class="{ 'form-group--error': $v.CountryID.$error }">
                    <q-select
                      :options="this.country"
                      autocomplete="new-country"
                      option-value="ID"
                      option-label="Title"
                      v-model="$v.CountryID.$model"
                      v-model.trim="$v.CountryID.$model"
                      color="white"
                      text-color="white"
                      dark
                      emit-value
                      map-options
                      label="Country">
                    </q-select>
                    <div class="error" v-if="!$v.CountryID.required">Field is required</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.AccountTypeID.$error }">
                    <q-select
                      :options="this.AccountType"
                      option-value="id"
                      option-label="name"
                      v-model="$v.AccountTypeID.$model"
                      v-model.trim="$v.AccountTypeID.$model"
                      color="white"
                      text-color="white"
                      dark
                      emit-value
                      map-options
                      label="Account Type">
                    </q-select>
                    <div class="error" v-if="!$v.AccountTypeID.required">Field is required</div>
                  </div>
                  <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.MtServerID.$error }">
                    <q-select
                      :options="this.MtServer"
                      option-value="id"
                      option-label="name"
                      v-model="$v.MtServerID.$model"
                      v-model.trim="$v.MtServerID.$model"
                      color="white"
                      text-color="white"
                      dark
                      emit-value
                      map-options
                      label="Trading Platform Type">
                    </q-select>
                    <div class="error" v-if="!$v.MtServerID.required">Field is required</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.DfCrnID.$error }">
                    <q-select
                      class="col-sm-6 q-pr-md"
                      :options="this.DfCrn"
                      option-value="id"
                      option-label="name"
                      v-model="$v.DfCrnID.$model"
                      v-model.trim="$v.DfCrnID.$model"
                      color="white"
                      text-color="white"
                      dark
                      emit-value
                      map-options
                      label="Account Base Currency">
                    </q-select>
                    <div class="error" v-if="!$v.DfCrnID.required">Field is required</div>
                </div>
                <div class="col-sm-6 q-pr-md" :class="{ 'form-group--error': $v.LeverageID.$error }">
                  <q-select
                    class="col-sm-6"
                    :options="this.Leverage"
                    aria-autocomplete="off"
                    option-value="id"
                    option-label="name"
                    v-model="$v.LeverageID.$model"
                      v-model.trim="$v.LeverageID.$model"
                    color="white"
                    text-color="white"
                    dark
                    emit-value
                    map-options
                    label="Leverage">
                  </q-select>
                    <div class="error" v-if="!$v.LeverageID.required">Field is required</div>
                </div>
              </div>
                <q-btn color="white" :loading="submitting" text-color="primary" class="full-width q-mt-lg" type="submit" label="Sign Up">
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                </q-btn>
            </q-form>
            </q-card-section>
        </q-card>
        <div class="links">
            <div class="text-center full-width">Do you have an account?
                <router-link to="/login">Login here.</router-link>
            </div>
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'PageLogin',
  data: function () {
    return {
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      CountryID: '',
      AccountTypeID: '',
      DfCrnID: '',
      MtServerID: '',
      LeverageID: '',
      Password: '',
      country: [],
      isUnique: false,
      submitting: false,
      DfCrn: [{ id: 252, name: 'USD' }, { id: 93, name: 'EUR' }, { id: 49, name: 'GBP' }, { id: 237, name: 'CHF' }],
      Leverage: [{ id: 100, name: '1:30' }],
      MtServer: [{ id: 2, name: 'MT5 (Forex, CFDs on Stocks, Equity Indices, Metals, Energies)' }, { id: 1, name: 'MT4 (Forex, CFDs on Equity Indices, Metals, Energies)' }],
      AccountType: [{ id: 1, name: 'Standard (1 lot=100,000)' }, { id: 2, name: 'Micro (1 lot=1,000)' }, { id: 3, name: 'XM Zero (1 lot=100,000)' }]
    }
  },
  mounted: function () {
    this.$axios.get('/lookup', {})
      .then((response) => {
        if (response.data.Data) {
          this.country = (response.data.Data.Countries)
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  },
  validations: {
    FirstName: {
      required
    },
    LastName: {
      required
    },
    Phone: {
      required
    },
    Email: {
      required
    },
    Password: {
      required
    },
    CountryID: {
      required
    },
    AccountTypeID: {
      required
    },
    MtServerID: {
      required
    },
    DfCrnID: {
      required
    },
    LeverageID: {
      required
    }
  },
  computed: {},
  methods: {
    loading: function () {
      this.submitting = true
    },
    handleEmailBlur () {
      return this.$axios.get('/client/mail?email=' + this.Email)
        .then(res => {
          this.isUnique = res.data.Data
        })
    },
    handleEmailChange () {
      if (this.Email.length === 0) {
        this.isUnique = false
      }
    },
    sign: function () {
      this.$axios.defaults.baseURL = process.env.CRM_API_POINT
      this.$v.$touch()
      console.log(this.$v)
      if (this.$v.$invalid) {
        return false
      } else {
        this.submitting = true
        this.$axios.post('/client/register', {
          FirstName: this.FirstName,
          LastName: this.LastName,
          Email: this.Email,
          Phone: this.Phone,
          Password: this.Password,
          CountryId: JSON.parse(this.CountryID),
          AccountTypeID: this.AccountTypeID,
          Leverage: this.LeverageID,
          DfCrnID: this.DfCrnID,
          MtServerID: this.MtServerID,
          SiteId: 1,
          DfLngID: 1,
          OgCompID: 1
        })
          .then((response) => {
            this.submitting = false
            if (response.data.Success) {
              setTimeout(() => {
                this.$router.push('/registration-success')
              }, 1000)
            }
          })
          .catch((error) => {
            this.submitting = false
            catchAxiosError(error)
          })
      }
    }
  }
}
</script>
<style>
  .sign-up .error {
    display: none;
    color: #ff0000;
    position: absolute;

  }

  .form-group--error .error,
  .sign-up .error.show{
    display: block;
  }
</style>
