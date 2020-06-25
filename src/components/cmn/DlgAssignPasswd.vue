<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card style="width: 300px;" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="newpassword"
          :type="isPwd ? 'password' : 'text'"
          label="New password"
          :rules="[
            val => !!val || 'Password can not be empty',
            val => val.length > 7 || 'Password must be at least 8 characters',
            ]"
          ref="newpassword"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
            <q-btn color="primary" icon="mdi-textbox-password" @click="genPasswd" flat>
              <q-tooltip content-class="bg-accent">Generate password</q-tooltip>
            </q-btn>
          </template>
        </q-input>

        <q-input
          v-model="checkpassword"
          :type="isPwd ? 'password' : 'text'"
          label="Re-type password"
          :rules="[
            val => val === newpassword || 'Parola eşleşemiyor',
            ]"
          ref="checkpassword"
        >
          <!--
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
          -->
        </q-input>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn class="q-mr-sm" dense color="primary" icon="done" @click="onOkClick"/>
        <q-btn dense color="warning" icon="clear" @click="onCancelClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { generatePassword } from '../../lib/cmn/passwd'

export default {
  name: 'DlgAssignPasswd',
  data: function () {
    return {
      newpassword: '',
      checkpassword: '',
      isPwd: true
    }
  },
  props: {
    title: { default: 'Yeni Parola' },
    isAdmin: { default: false }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    genPasswd () {
      this.newpassword = generatePassword(8)
      this.isPwd = false
      this.checkpassword = ''
    },

    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOkClick () {
      if (!this.$refs.newpassword.validate()) {
        return
      }

      if ((!this.$refs.checkpassword.validate()) && (!this.isAdmin)) {
        return
      }

      this.$emit('ok', { newpasswd: this.newpassword })
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>
