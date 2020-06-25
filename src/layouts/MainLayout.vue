<template>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="text-white">
      <q-toolbar>

        <q-toolbar-title class="q-pa-md">
         <img src="~assets/nyfx-logo.svg" style="max-height: 75px;"/>
        </q-toolbar-title>
        <template>
          <q-select
            v-model="lang"
            :options="langOptions"
            dense
            borderless
            emit-value
            map-options
            options-dense
            dark
            class="q-mr-md"
            :content-style="{ backgroundColor: '#ff0000' }"
            style="min-width: 120px"
          />
        </template>
        <div class="q-gutter-sm row items-center no-wrap">
        <!-- <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          /> -->
          <!-- <q-btn dense flat no-wrap no-caps>
            <q-avatar size="24px" icon="mdi-account"></q-avatar>
            <q-icon name="arrow_drop_down" size="16px"/>
            <q-menu auto-close>
              <q-list dense>
                <q-item clickable>
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable v-on:click="logout">
                  <q-item-section>Çıkış</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> -->
          <base-profile-menu />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2 q-pt-lg">
      <q-list>
        <!-- <q-item color="grey" text-color="grey-9" to="/" v-ripple exact>
            <q-item-section avatar>
              <q-icon name="apps"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Applications</q-item-label>
            </q-item-section>
        </q-item> -->
         <q-item to="/account" exact>
            <q-item-section avatar>
              <q-icon name="layers"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('accounts' )}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/funds">
            <q-item-section avatar>
              <q-icon name="account_balance_wallet"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('funds')}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/transactions">
            <q-item-section avatar>
              <q-icon name="local_atm"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('transactions')}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/tools">
            <q-item-section avatar>
              <q-icon name="build"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('tools')}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/partners">
            <q-item-section avatar>
              <q-icon name="perm_contact_calendar"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('partners')}}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/platforms">
            <q-item-section avatar>
              <q-icon name="equalizer"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('platforms') }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/suggestions">
            <q-item-section avatar>
              <q-icon name="forum"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('suggestions') }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item to="/contact">
            <q-item-section avatar>
              <q-icon name="email"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('contactus') }}</q-item-label>
            </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
<script>
import BaseProfileMenu from '../components/cmn/BaseProfileMenu'
export default {
  name: 'MainLayout',
  components: { BaseProfileMenu },
  data () {
    return {
      leftDrawerOpen: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'tr', label: 'Türkçe' }
      ]
    }
  },
  methods: {
    logout: function () {
      // todo: server'a token'ı invalidate edelim
      this.$store.commit('session/setLogout')
      this.$router.push('/login')
    }
  },

  watch: {
    lang (lang) {
      this.$t('homepage')
      this.$i18n.locale = lang
    }
  },

  computed: {
    username: function () {
      if ((this.$store.state.session.UserFullName !== '') && (this.$store.state.session.UserFullName !== undefined)) {
        return this.$store.state.session.UserFullName
      } else {
        return this.$store.state.session.UserName
      }
    }
  }
}
</script>
