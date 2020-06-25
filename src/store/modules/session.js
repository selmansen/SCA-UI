import { LocalStorage } from 'quasar'
import Session from '../../model/cmn/authInfo'
import Vue from 'vue'

const state = new Session()

const mutations = {
  setLogin: function (state, payload) {
    state.UserID = payload.data.UserID
    state.UserEmail = payload.data.UserEmail
    state.AccessToken = payload.data.AccessToken
    state.UserFullName = payload.data.UserFullName
    state.LoggedIn = true
    state.Roles = payload.data.Roles
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.data.AccessToken
    if (payload.write) {
      LocalStorage.set('Session', state)
    }
  },
  setInit: function (state) {
    state.LoggedIn = false
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = ''
    LocalStorage.set('Session', state)
  },
  setLogout: function (state) {
    // todo: burada güvenlik zafiyeti var ! backend'de token invalidate edilmeli
    // bunun için memlist'e ek bir claim tutulabilir
    // ve jwtAuth verify koduna yazılıabilinir.
    // örnek : https://dev.to/stevensunflash/a-working-solution-to-jwt-creation-and-invalidation-in-golang-4oe4

    state.UserName = ''
    state.UserID = 0
    state.UserEmail = ''
    state.AccessToken = ''
    state.UserFullName = ''
    state.LoggedIn = false
    state.Roles = []
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = ''
    LocalStorage.remove('Session')
  }
}

/*
const actions = {
  login: function (context, info) {
    context.commit('setLogin', {
      userName: info.username,
      userEmail: info.userEmail,
      accessToken: 'aaaaa'
    }
    )
  }
}
*/

export default {
  namespaced: true,
  state,
  mutations
  // actions
}
