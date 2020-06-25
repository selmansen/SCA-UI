const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/account', component: () => import('pages/Account/Account.vue') },
      { path: '/account-validation', component: () => import('pages/Account/AccountValidation.vue') },
      { path: '/platforms', component: () => import('pages/Platforms/Platforms.vue') },
      { path: '/tools', component: () => import('pages/Tools/Tools.vue') },
      { path: '/partners', component: () => import('pages/Partners/Partners.vue') },
      { path: '/transactions', component: () => import('pages/Transaction/TransactionList.vue') },
      { path: '/transactions/:id', component: () => import('pages/Transaction/Transaction.vue') },
      { path: '/funds', component: () => import('pages/Funds/Funds.vue') },
      { path: '/funds/:id', component: () => import('pages/Funds/Funds.vue') },
      { path: '/suggestions', component: () => import('pages/Suggestions.vue') },
      { path: '/contact', component: () => import('pages/Contact.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Simple.vue'),
    meta: {
      auth: false
    },
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/signup', component: () => import('pages/SignUp.vue') },
      { path: '/reset-password', component: () => import('pages/Reset.vue') },
      { path: '/registration-success', component: () => import('pages/RegisterResult.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
