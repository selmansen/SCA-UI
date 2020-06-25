import { LocalStorage } from 'quasar'
import vdata from '../../version'
// import { jwtDecode } from 'jwt-decode'
var jwtDecode = require('jwt-decode')

export default ({ app, router, store, Vue }) => {
  Vue.prototype.$VERSION = vdata
  Vue.prototype.$globalEventBus = new Vue() // Global event bus

  const authInfo = LocalStorage.getItem('Session')

  if (authInfo !== null) {
    if (authInfo.AccessToken !== '' && authInfo.AccessToken !== undefined) {
      // todo: token'ın valid olup olmadığını kontrol edelim
      const decodedToken = jwtDecode(authInfo.AccessToken)

      if (decodedToken.exp < Date.now() / 1000) {
        store.commit('session/setInit')
        return
      }

      store.commit('session/setLogin', { data: authInfo, write: false })
    } else {
      store.commit('session/setInit')
    }
  } else {
    store.commit('session/setInit')
  }
}
