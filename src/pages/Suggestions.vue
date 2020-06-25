<template>
      <div class="q-pa-xl account suggestions">
        <h2 color="grey">{{ $t('suggestions' )}}</h2>
        <q-card class="q-pa-lg">
            <p>Hello, we would like to hear your feedback about our SCA interface.</p>
            <p>How would you rate your experince on a scale of below bar?</p>
            <q-slider
                v-model="greenModel"
                color="green"
                class="q-mt-xl"
                markers
                snap
                label
                label-always
                :min="0"
                :max="5"
            />
            <div class="suggestion-labels">
                <label>I don't like it</label>
                <label>Not Enough Good</label>
                <label>Can be better</label>
                <label>Good</label>
                <label>Very Nice and Useful</label>
            </div>
            <q-form class="full q-mt-lg">
                <q-radio v-model="type" val="suggestion" :label=" $t('suggestion' )" />
                <q-radio v-model="type" val="problem" :label="$t('problem' )" />
                <q-radio v-model="type" val="compliment" :label="$t('compliment' )" />
                <q-radio v-model="type" val="other" :label="$t('other' )" />
                <q-input
                    class="q-mb-md"
                    v-model="feedback"
                    filled
                    type="textarea"
                />
                <q-btn color="primary">Send Feedback</q-btn>
            </q-form>
        </q-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      basicModel: 5,
      greenModel: 2,
      type: '',
      feedback: ''
    }
  }
}
</script>
<style>
    .suggestions p {
        font-size: 18px;
        color: #5a5a5a;
    }
    .suggestions .q-radio__inner {
        display: none;
    }
    .suggestions .q-radio{
        padding: 7px 20px;
        text-transform: uppercase;
        min-width: 15%;
        justify-content: center;
        margin: 20px 5px 20px 0px;
        background: #dedede;
    }
    .suggestions div[aria-checked='true'] {
        background: #1976D2;
        color: #FFF;
    }
    .suggestions textarea {
        resize: none!important;
    }
    .q-slider__track-container--h {
        height: 15px;
    }
    .q-slider__thumb-container {
        background : #4caf50;
        border-radius: 50%;
    }
    .q-slider__pin-text-container,
    .q-slider__thumb-container{
        background: #999;
    }
    .q-slider__thumb-container svg {
        display: none;
    }
    .q-slider__arrow--h{
        border-top-color: #999;
    }
    div[aria-valuenow='1'] .q-slider__track {
        background: linear-gradient(90deg, rgba(210,8,8,1) 100%, rgba(255,218,111,1) 50%, rgba(20,255,0,1) 100%);

    }
    div[aria-valuenow='2'] .q-slider__track {
        background: linear-gradient(90deg, rgba(210,8,8,1) 0%, rgba(255,201,111,1) 50%, rgba(255,201,111,1) 100%);

    }
    div[aria-valuenow='3'] .q-slider__track {
        background: linear-gradient(90deg, rgba(210,8,8,1) 0%, rgba(255,201,111,1) 50%, rgba(251,255,111,1) 100%);
    }
    div[aria-valuenow='4'] .q-slider__track {
        background: linear-gradient(90deg, rgba(210,8,8,1) 0%, rgba(251,255,111,1) 50%, rgba(173,255,111,1) 100%);
    }
    div[aria-valuenow='5'] .q-slider__track {
        background: linear-gradient(90deg, rgba(210,8,8,1) 0%, rgba(255,201,111,1) 25%,  rgba(251,255,111,1) 50%, rgba(173,255,111,1) 75%, rgba(20,255,0,1) 100%);
    }

    .suggestion-labels label{
        display: inline-block;
        font-size: 12px;
        text-align: center;
        width: 20%;
        margin-top: 10px;
        position: relative;
        font-weight: 500;
        color: #cecece;
    }

    .suggestion-labels label:before {
        content:'';
        position: absolute;
        top:-10px;
        left:0;
        right: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #dedede;
    }
    .full {
        width: 100%;
    }
</style>
