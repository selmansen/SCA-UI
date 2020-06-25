<template>
    <div class="q-pa-md transactions">
         <q-table
          :data="transactionList"
          :columns="columns"
          :title="$t('transactions' )"
          :loading="loading"
        >
        <template slot="top-right">
          <q-select
            style="width: 180px"
            v-model="accountID"
            :options="accountList"
            option-label="MtLogin"
            option-value="ID"
            @input="event => getAccountTransactions()"
            label="Select an account"
          >
          <template v-if="accountID" v-slot:append>
            <q-icon name="cancel" @click.stop="accountID = null; getTransactionList()" class="cursor-pointer" />
          </template>
          </q-select>
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="date" :props="props">
            {{ props.row.Dt | formatDate }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.Amn }}
          </q-td>
          <q-td key="currency" :props="props">
            {{ props.row.DfCrnCode }}
          </q-td>
          <q-td key="type" :props="props">
            <span class="q-badge deposit" v-if="props.row.Typ == 'Deposit'">{{props.row.Typ}}</span>
            <span class="q-badge" v-else>{{props.row.Typ}}</span>
          </q-td>
          <q-td key="parity" :props="props">
            {{ props.row.Parity }}
          </q-td>
        </q-tr>
         </q-table>
    </div>
</template>
<script>
import Vue from 'vue'
import { catchAxiosError } from '../../lib/cmn/axios'

Vue.filter('formatDate', function (value) {
  if (value) {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return (`${day}-${month}-${year}`)
  }
})

export default {
  data () {
    return {
      loading: false,
      transactionList: [],
      accountList: [],
      accountID: '',
      columns: [
        {
          name: 'date',
          label: 'Date',
          align: 'center'
        },
        {
          name: 'amount',
          label: 'Amount',
          align: 'center'
        },
        {
          name: 'currency',
          label: 'Currency',
          align: 'center'
        },
        {
          name: 'type',
          label: 'Type',
          align: 'center'
        },
        {
          name: 'parity',
          label: 'Parity',
          align: 'center'
        }
      ]
    }
  },
  mounted: function () {
    this.getTransactionList()
  },
  methods: {
    getTransactionList: function () {
      this.loading = true
      this.$axios.get('/transaction/list', {})
        .then((response) => {
          this.loading = false
          if (response.data.Data) {
            this.transactionList = response.data.Data
          }
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    },

    getAccountTransactions: function () {
      this.loading = true
      this.$axios.get('/transaction/list/' + this.accountID.ID, {})
        .then((response) => {
          this.loading = false
          if (response.data.Data) {
            this.transactionList = response.data.Data
          }
        })
        .catch((error) => {
          catchAxiosError(error)
        })
    }
  },
  beforeMount: function () {
    this.$axios.get('/account/list', {})
      .then((response) => {
        if (response.data.Data) {
          this.accountList = response.data.Data
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
  }
}
</script>
<style lang="scss">
.transactions {
  .q-table__title {
    font-size: 32px;
    color: #555;
  }
  .q-badge {
    text-transform: uppercase;
    font-weight: 500;
    background: red;
  }
  .deposit {
    background: green;
  }
}
</style>
