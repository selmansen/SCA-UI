<template>
      <div class="q-pa-xl account">
        <h2 color="grey">{{ $t('contactus' )}}</h2>
        <q-card class="q-pa-lg">
            <q-card-section class="row offices">
                <div class="col-sm-4">
                  <q-card class="q-mr-sm q-pa-md">
                      <h5>Headquarter</h5>
                      <div class="line">
                          <i class="material-icons">location_on</i>
                          <span>Lorem ipsum sit dolor TORONTO</span>
                      </div>
                      <div class="line">
                          <i class="material-icons">phone</i>
                          <span>+40 593 33 44</span>
                      </div>
                      <div class="line">
                          <i class="material-icons">email</i>
                          <a href="mailto:headquarter@office.com">headquarter@office.com</a>
                      </div>
                  </q-card>
                </div>
                <div class="col-sm-4">
                  <q-card class="q-mr-sm q-pa-md">
                      <h5>Istanbul</h5>
                      <div class="line">
                          <i class="material-icons">location_on</i>
                          <span>Lorem ipsum sit dolor ISTANBUL</span>
                      </div>
                      <div class="line">
                          <i class="material-icons">phone</i>
                          <span>+90 593 33 44</span>
                      </div>
                      <div class="line">
                          <i class="material-icons">email</i>
                          <a href="mailto:istanbul@office.com">istanbul@office.com</a>
                      </div>
                  </q-card>
                </div>
            </q-card-section>
            <q-form class="full q-mt-lg">
                <q-input
                    class="q-mb-md"
                    v-model="feedback"
                    filled
                    placeholder="Your message"
                    type="textarea"
                />
                <q-btn color="primary">Send</q-btn>
            </q-form>
        </q-card>
    </div>
</template>
<script>

export default {
  data () {
    return {
      feedback: ''
    }
  }
}
</script>

<style scoped>
  .offices {
    color: #000;
  }
  .offices div.line {
    padding: 10px 0px;
    border-bottom: 1px solid #dedede;
  }
  .offices i {
    margin-right: 5px;
    font-size: 20px;
  }
  .offices a {
    color: #000;
  }
  .offices a:hover,
  .offices div.line:hover i {
    color: #1976D2;
  }
</style>
