<template>
      <div class="q-pa-xl account funds">
        <h2 color="grey">{{ $t('funds' )}} <small>Deposit Funds - Credit/Debit Cards</small></h2>
        <q-card class="q-pa-lg">
            <div class="not-validated alert-warning q-pa-lg q-mb-lg">
                <h4><i class="material-icons">warning</i> Your account is not validated</h4>
                <p>Please note that in order to proceed you will need to first validate your account.</p>
                <p>To validate your account please provide us with the necessary <b>Proof of ID</b> and <b>Proof of Residency</b> documents.</p>
                <q-btn to="/account-validation">Validate Your Account Here</q-btn>
            </div>
            <p>Please enter the amount you wish to deposit to your account.
            <div class="account">
                <label>
                    <span>
                        <i class="material-icons">account_box</i>
                        Account ID:
                    </span>
                    <b>2423434</b>
                </label>
                <label>
                    <span>
                        <i class="material-icons">person</i>
                        Account Name:
                    </span>
                    <b>Nesrin Kalender</b>
                </label>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <q-form>
                <q-input
                    label="Deposit Amount (USD):"
                    type="text"
                    v-model="deposit"
                />
                <q-btn color="primary" class="q-mt-md" label="Deposit"></q-btn>
            </q-form>
        </q-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      deposit: ''
    }
  }
}
</script>
<style scoped>
    .funds {
        color: #5a5a5a;
    }
    .funds .account {
        display: flex;
    }
    .funds .account label {
        margin-right: 20px;
        display: inline-flex;
        align-items: center;
    }
    .funds .account i {
        font-size: 23px;
        margin-right: 5px;
    }
    .funds .account span {
        display: inline-flex;
        margin-right: 5px;
        font-weight: bold;
    }
    .funds .account b {
        color: #d51820;
    }
    .funds p {
        font-size: 18px;
    }
</style>
