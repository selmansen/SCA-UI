<template>
  <div class="row q-pa-md account">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 login-form q-pa-lg">
        <h2 color="grey"> {{ $t('partners')}} <small></small></h2>
        <q-card class="q-pa-md q-mt-md partners">
            <q-card-section class="row">
                <q-card class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <q-card-section>
                        <q-img src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                        <h5 class="text-h5 text-center q-mt-md">Introducing Broker Program</h5>
                        <q-btn color="primary q-mr-sm q-mt-lg" text-color="white">{{ $t('joinNow') }}</q-btn>
                        <b class="q-mt-lg">The Partners Introducing Brokers Program offers the opportunity to earn a substantial, ongoing commission on the trading activity of clients that are referred to.</b>
                        <div>
                            <p> Sets a highly-competitive IB
                            commission rate and offers one of the most
                            cutting-edge tracking tools in the fadksflmaksdmfakfmad</p> <a>{{ $t('readMore')}}</a>
                        </div>
                    </q-card-section>
                </q-card>
            </q-card-section>
        </q-card>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Partners'
}
</script>
