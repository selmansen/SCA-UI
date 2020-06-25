<template>
  <div class="row q-pa-md platforms account">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-lg">
        <h2 color="grey">{{ $t('platforms') }} <small></small></h2>
        <q-tabs
            v-model="tools"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
                <q-tab class="q-pb-sm q-pt-sm" name="meta-5" label="MetaTrader 5" />
                <q-tab class="q-pb-sm q-pt-sm" name="meta-4" label="MetaTrader 4" />
                <q-tab class="q-pb-sm q-pt-sm" name="ctrader" label="CTrader" />
                <q-tab class="q-pb-sm q-pt-sm" name="others" v-bind:label="$t('others')" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tools" animated class="q-pa-md">
                <q-tab-panel name="meta-5">
                    <div class="row">
                        <q-card class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div class="text-h5 q-pa-md" color="primary">WebTrader</div>
                            <q-card-section class="bg-primary">
                                <img src="~/assets/imac-pro@2x.png" height="80px" />
                            </q-card-section>
                              <div class="q-pa-md">
                                <p> Sets a highly-competitive IB
                                commission rate and offers one of the most
                                cutting-edge tracking tools in the fadksflmaksdmfakfmad</p> <a>{{ $t('readMore') }}</a>
                            </div>
                        </q-card>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="meta-5">
                    <div class="row q-gutter-md">
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Pip calculator</div>
                                <p>The PIP Calculator provides a value per pip based on the trade volume entered on a particular asset.</p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat>{{ $t('openCalculator')}}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Margin calculator</div>
                                <p>The Margin Calculator indicates the margin required to enter a position on an asset given the leverage of the account, volume and the asset traded.</p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat>{{ $t('openCalculator')}}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Profit calculator</div>
                                <p>The Profit Calculator reveals the trade profit on an asset given the volume of the trade, the difference in open and close price, and the asset traded.</p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat>{{ $t('openCalculator')}}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Platforms',
  data () {
    return {
      tools: 'meta-5'
    }
  }
}
</script>
