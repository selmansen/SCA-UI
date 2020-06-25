<template>
  <div class="row q-pa-md account">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-lg">
        <h2 color="grey">{{ $t('tools' )}} <small> {{ $t('tradingToolsTitle' )}}</small></h2>
        <q-card>
            <q-tabs
            v-model="tools"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
                <q-tab class="q-pb-sm q-pt-sm" name="tech-analysis" v-bind:label="$t('technicalAnalysis')" />
                <q-tab class="q-pb-sm q-pt-sm" name="calculators" v-bind:label="$t('calculators')" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tools" animated class="q-pa-md">
                <q-tab-panel name="tech-analysis">
                    <div class="row">
                        <q-card class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div class="text-h5 q-pa-xs">AutoChartist</div>
                            <q-img src="~/assets/chartist.png" basic></q-img>
                            <q-separator dark />
                            <q-card-actions vertical>
                                <q-btn color="primary" flat>Action 1</q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="calculators">
                    <div class="row q-gutter-md">
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Pip {{ $t('calculators') }}</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat> {{ $t('openCalculator') }}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Margin {{ $t('calculators') }}</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat> {{ $t('openCalculator') }}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                        <q-card class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 q-pa-md">
                            <q-card-container>
                                <!-- <q-icon name="send" /> -->
                                <div class="text-h5 q-mb-10">Profit {{ $t('calculators') }}</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <q-card-actions>
                                    <q-btn outline align="left" color="primary" icon-right="trending_flat" flat> {{ $t('openCalculator') }}</q-btn>
                                </q-card-actions>
                            </q-card-container>
                        </q-card>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
  data () {
    return {
      tools: 'tech-analysis'
    }
  }
}
</script>
