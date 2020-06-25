<template>
    <q-btn dense flat no-wrap no-caps>
        <q-avatar size="24px" icon="mdi-account"></q-avatar>
        <div>{{ username }}</div>
        <q-icon name="arrow_drop_down" size="16px"/>
        <q-menu auto-close>
            <q-list dense>
                <q-item clickable to="/profile">
                    <q-item-section>My Account</q-item-section>
                </q-item>
               <!--<q-item clickable @click="newPasswd">
                    <q-item-section>Change Password</q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section>Yardım</q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section>Ayarlar</q-item-section>
                </q-item>
                -->
                <q-item clickable v-on:click="logout">
                    <q-item-section>Logout</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script>
import DlgAssignPasswd from './DlgAssignPasswd'
import { catchAxiosError, showAxiosError } from '../../lib/cmn/axios'

export default {
  name: 'base-profile-menu',
  data: function () {
    return {}
  },
  props: {
  },
  mounted () {
  },
  methods: {
    logout () {
      this.$store.commit('session/setLogout')
      this.$router.push('/login')
    },

    newPasswd () {
      this.$q.dialog({
        component: DlgAssignPasswd,
        parent: this,
        // ----------------------
        isAdmin: false
      })
        .onOk(data => {
          this.$axios.post('/dfusr/setpasswd/' + this.$store.state.session.UserID.toString(),
            null,
            {
              params: {
                newpasswd: data.newpasswd
              }
            })
            .then((response) => {
              if (response.data.Success) {
                // do nothing
              } else {
                showAxiosError(response)
              }
            })
            .catch(function (error) {
              catchAxiosError(error)
            })
            .finally(() => {
              // this.showPlanEdit = false
            })
        })
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
