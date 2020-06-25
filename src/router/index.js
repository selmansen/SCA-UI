import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/store/index'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

router.beforeEach(async (to, from, next) => {
  // console.dir(store.state.session.Login)
  // next()

  const userLoggedIn = store.state.session.LoggedIn
  const checkAuth = to.matched.some(m => m.meta.auth)
  if (!checkAuth) {
    next()
  }

  if ((checkAuth) && (!userLoggedIn)) {
    next('/login')
  }

  if ((userLoggedIn) && (to.path === '/login')) {
    next('/')
  }

  next()
})

export default router
