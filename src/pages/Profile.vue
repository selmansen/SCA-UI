<template>
<div class="row q-pa-lg profile">
    <h2>{{$t('myProfile')}}</h2>
    <q-card class="col-12 q-mt-lg">
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator>
                <q-tab class="q-pb-sm q-pt-sm" name="my-profile" v-bind:label="$t('myProfile')" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated class="q-pa-md">
                <q-tab-panel name="my-profile">
                    <div>
                          <h3>Personal Details</h3>
                          <q-form @submit.prevent="save" ref="personalDetails" class="q-gutter-md">
                            <div class="row">
                              <q-input
                                class="col-sm-3 q-mr-xl"
                                v-model="profile.FirstName"
                                label="First Name"
                                required
                                name="FirstName"
                              />
                              <q-input
                                class="col-sm-3 q-ml-sm q-mr-xl"
                                v-model="profile.MiddleName"
                                label="Middle Name"
                                name="MiddleName"
                              />
                              <q-input
                                class="col-sm-3 q-ml-sm"
                                v-model="profile.LastName"
                                label="Last Name"
                                required
                                name="LastName"
                              />
                            </div>
                            <div class="row">
                                <q-input
                                  class="col-sm-5 q-mr-lg"
                                  v-model="profile.Phone"
                                  label="Mobile Number"
                                  required
                                  name="Phone"
                                />
                                <div class="col-sm-5">
                                  <q-input
                                    v-model="profile.Email"
                                    label="Email"
                                    type="email"
                                    required
                                    name="Email"
                                    @blur="handleEmailBlur"
                                    @input="handleEmailChange"
                                  />
                                  <div class="error show" v-if="isUnique">This email is already registered.</div>
                                </div>
                            </div>
                            <div class="row">
                                <q-input
                                  class="col-sm-5 q-mr-lg"
                                  value="xxxxx"
                                  type="password"
                                  label="Password"
                                  readonly
                                >
                                  <template v-slot:append>
                                    <q-icon name="edit" class="cursor-pointer" @click="alert = true">
                                      <q-dialog v-model="alert">
                                        <q-card>
                                        <q-form @submit.prevent="loading" ref="updatePass" @submit="updatePass" class="q-pa-lg">
                                           <q-input
                                              class="col-sm-7 q-mr-lg"
                                              v-model="profile.CurrentPassword"
                                              label="Current Password"
                                              type="password"
                                              :rules="[ val => !!val || 'Please fill the field']"
                                            />
                                            <q-input
                                              class="col-sm-7 q-mr-lg"
                                              v-model="profile.Password"
                                              label="New Password"
                                              type="password"
                                              lazy-rules
                                              v-bind:rules="Required"
                                              ref="fldPasswordChange"
                                            />
                                            <q-input
                                              class="col-sm-7 q-mr-lg"
                                              v-model="profile.PasswordConfirmation"
                                              label="Confirm new password"
                                              type="password"
                                              v-bind:rules="ConfirmPWD"
                                              ref="fldPasswordChangeConfirm"
                                            />
                                            <q-btn type="submit" :loading="submitting" color="primary" class="q-mt-sm" label="Update">
                                                <template v-slot:loading>
                                                  <q-spinner-facebook />
                                                </template>
                                            </q-btn>
                                        </q-form>
                                        </q-card>
                                      </q-dialog>
                                    </q-icon>
                                  </template>
                                </q-input>
                                <q-input
                                  class="col-sm-5 q-mr-lg"
                                  v-model="profile.Town"
                                  label="City"
                                  required
                                  name="Town"
                                />
                            </div>
                            <div class="row">
                                <q-input
                                  class="col-sm-5 q-mr-lg"
                                  v-model="profile.Area"
                                  label="County"
                                  name="Area"
                                />
                                <q-input
                                  class="col-sm-5"
                                  v-model="profile.PostalCode"
                                  label="Postcode"
                                  name="PostalCode"
                                />
                            </div>
                            <div class="row">
                              <q-input
                                  class="col-sm-5 q-mr-lg"
                                  v-model="profile.StreetName"
                                  label="Street Name"
                                  name="StreetName"
                                />
                               <q-select
                                  class="col-sm-5"
                                  v-model="profile.CountryId"
                                  :options="this.country"
                                  option-value="ID"
                                  option-label="Title"
                                  label="Country"
                                  name="CountryId"
                                  emit-value
                                  map-options
                                />
                            </div>
                            <div class="row">
                                <q-input
                                  class="col-sm-3 q-mr-sm"
                                  v-model="profile.FlatNumber"
                                  label="Flat Number"
                                  name="FlatNumber"
                                />
                                <q-input
                                  class="col-sm-2"
                                  v-model="profile.HouseNo"
                                  label="House No"
                                  name="HouseNo"
                                />
                                <q-input class="col-sm-5  q-ml-md" v-model="profile.DateOfBirth">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date class="text-left" mask="DD.MM.YYYY" name="DateOfBirth" v-model="profile.DateOfBirth" @input="() => $refs.qDateProxy.hide()" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                            </div>
                            <h3>Account Leverage</h3>
                            <div class="row">
                              <q-input
                                  class="col-sm-5"
                                  v-model="profile.Leverage"
                                  label="Leverage"
                                  name="Leverage"
                                  readonly
                                >
                                <template v-slot:append>
                                    <q-icon name="edit" class="cursor-pointer" @click="leverage = true">
                                      <q-dialog v-model="leverage">
                                        <q-card>
                                        <q-form @submit.prevent="loading" ref="updateLeverage" @submit="updateLeverage" class="q-pa-lg">
                                           <q-input
                                              class="col-sm-7 q-mr-lg"
                                              v-model="profile.Leverage"
                                              label="New Leverage"
                                              type="number"
                                            />
                                            <q-btn type="submit" :loading="submitting" color="primary" class="q-mt-sm" label="Update">
                                                <template v-slot:loading>
                                                  <q-spinner-facebook />
                                                </template>
                                            </q-btn>
                                        </q-form>
                                        </q-card>
                                      </q-dialog>
                                    </q-icon>
                                  </template>
                              </q-input>
                            </div>
                            <q-btn color="primary" :loading="submitting" type="submit" icon="save" label="Save&Update">
                              <template v-slot:loading>
                                <q-spinner-facebook />
                              </template>
                            </q-btn>
                          </q-form>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
    </q-card>
</div>
</template>
<script>
import { catchAxiosError } from '../lib/cmn/axios'

export default {
  data () {
    return {
      tab: 'my-profile',
      country: [],
      profile: {},
      alert: false,
      leverage: false,
      isUnique: false,
      submitting: false,
      email: '',
      submittingProfile: false
    }
  },
  mounted: function () {
    this.getClientData()
    this.getCountry()
  },
  computed: {
    ConfirmPWD () {
      return [
        (v) => !!v || 'Please fill the field',
        (v) => v === this.$refs.fldPasswordChange.value || 'Passwords are not matching'
      ]
    },
    Required () {
      return [(v) => !!v || 'Please fill the field']
    }
  },
  methods: {
    loading (type) {
      this.submitting = true
    },
    showNotif (msg, type) {
      this.$q.notify({
        position: 'top',
        message: msg,
        color: type
      })
    },
    handleEmailBlur () {
      if (this.profile.Email !== this.email) {
        return this.$axios.get('/client/mail?email=' + this.profile.Email)
          .then(res => {
            this.isUnique = res.data.Data
          })
      } else {
        this.isUnique = false
      }
    },
    handleEmailChange () {
      if (this.profile.Email.length === 0) {
        this.isUnique = false
      }
    },
    getClientData: function () {
      this.$axios.get('/client/info', {})
        .then((response) => {
          if (response.data.Data) {
            this.profile = response.data.Data
            this.email = this.profile.Email
          } else {
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    },
    getCountry: function () {
      this.$axios.get('/lookup', {})
        .then((response) => {
          if (response.data.Data) {
            this.country = (response.data.Data.Countries)
          } else {
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    },
    save: function () {
      this.$refs.personalDetails.validate().then(success => {
        if (success && !this.isUnique) {
          this.submitting = true
          const data = this.profile
          this.$axios.put('/client/info', data)
            .then((response) => {
              if (response.data.Data) {
                setTimeout(() => {
                  this.submitting = false
                  this.alert = false
                  this.showNotif('Your changes has been saved.', 'positive')
                }, 1000)
              } else {
                this.showNotif('Ups.. something went wrong', 'positive')
              }
            })
            .catch((error) => {
              catchAxiosError(error)
            })
        } else {
          // oh no, user has filled in
          // at least one invalid value
        }
      })
    },
    updatePass: function () {
      this.$refs.updatePass.validate().then(success => {
        if (success) {
          this.$axios.put('/client/password', {
            CurrentPassword: this.profile.CurrentPassword,
            Password: this.profile.Password,
            PasswordConfirmation: this.profile.PasswordConfirmation
          })
            .then((response) => {
              this.submitting = false
              if (response.data.Data) {
                setTimeout(() => {
                  this.alert = false
                  this.showNotif('Your password has been changed.', 'positive')
                }, 1000)
              } else {
                this.$router.push('/login')
              }
            })
            .catch((error) => {
              this.submitting = false
              catchAxiosError(error)
            })
        }
      })
    },
    updateLeverage: function () {
      this.$refs.updateLeverage.validate().then(success => {
        if (success) {
          this.$axios.put('/client/leverage', {
            Leverage: this.profile.Leverage
          })
            .then((response) => {
              this.submitting = false
              if (response.data.Data) {
                setTimeout(() => {
                  this.alert = false
                  this.showNotif('Your leverage value has been changed.', 'positive')
                }, 1000)
              } else {
                this.$router.push('/login')
              }
            })
            .catch((error) => {
              this.submitting = false
              catchAxiosError(error)
            })
        }
      })
    }
  }
}
</script>
<style scoped>
  .error {
    color: #ff0000;
  }
</style>
