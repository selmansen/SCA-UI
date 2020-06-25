<template>
  <q-select
    use-input
    hide-selected
    fill-input
    clearable

    :label="label"
    :value="value"
    :loading="loading"
    v-on="listeners"
    :options="options"
    @filter="filterFn"
    @clear="clearFn"
    @input-value="setModel"
    emit-value
    map-options
    :bottom-slots="bottomSlots"
    :rules="rules"
    :option-label="getOptionLabel"

    ref="mLookUp"
    options-dense

    v-bind="$attrs"
  >
    <template v-slot:append>
      <q-btn round dense flat icon="add" @click="addNewRecord" v-show="createLink !== ''"/>
    </template>
  </q-select>

</template>

<script>
import { catchAxiosError, showAxiosError } from '../../lib/cmn/axios'

export default {
  name: 'lookup',
  data: function () {
    return {
      options: [],
      finalLabel: '',
      loading: false,
      callCount: 0
    }
  },
  props: {
    value: { default: null },
    displayLabel: { required: true },
    label: { type: String, default: '' },
    query: { type: String, default: '' },
    queryType: { type: String, default: 'Code' }, /* Code, CodeTitle, CodeAndTitle, Title */
    bottomSlots: { type: Boolean, default: false },
    createLink: { type: String, default: '' },
    parentVal: { default: '' },
    rules: { default: null },
    targetField: { type: String, default: '' } // // editTable için gerekli
  },
  mounted: function () {
    if ((this.displayLabel !== '') && (this.displayLabel !== undefined) && (this.displayLabel !== null) && (this.displayLabel !== ' - ') && (this.options.length === 0)) {
      this.options.push({ value: this.value, label: this.displayLabel })
    }
    /*
    todo: yukarıdaki kodu default değerleri düzgün gösterebilmek için yazdım, normalde value'ya bakmalıyız ve value için gerekli değeri pull etmeliyiz
    */
  },
  created () {
    // console.log(this)
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => {
          let optLabel = ''
          let optDescription = ''
          const opt = this.options.filter(opt => opt.value === event)
          if (opt[0] !== undefined) {
            optLabel = opt[0].label
            optDescription = opt[0].description
          }

          // const optLabel = this.$refs.mLookUp.inputValue
          // const optLabel = this.$refs.mLookUp.getOptionLabel(event)
          // console.log(optLabel)

          this.$emit('input', event)
          this.$globalEventBus.$emit('setCellValueFromLookUp', optLabel, optDescription, this.targetField)
        }
      }
    }
  },
  watch: {
    displayLabel () {
      if ((this.displayLabel !== '') && (this.displayLabel !== undefined) && (this.displayLabel !== null) && (this.displayLabel !== ' - ')) {
        this.options.push({ value: this.value, label: this.displayLabel })
      }
    }
  },
  methods: {
    addNewRecord () {
      if (this.createLink !== '') {
        const routeData = this.$router.resolve({ path: this.createLink + '/new' })
        window.open(routeData.href, '_blank')
      }
    },

    filterFn (val, update, abort) {
      update(() => {
        if (this.callCount < 1) {
          this.fillOptions(val)
        }
      })
    },

    fillOptions (val) {
      this.callCount += 1

      this.options = []
      this.loading = true
      this.$axios.post('/lookup/' + this.query, {},
        {
          params: {
            search: val,
            parentVal: this.parentVal,
            queryType: this.queryType
          }
        })
        .then((response) => {
          if (response.data.Success) {
            this.options = Object.freeze(response.data.Data)
          } else {
            showAxiosError(response)
          }
        })
        .catch((err) => {
          catchAxiosError(err)
        })
        .finally(() => {
          this.loading = false
          this.callCount -= 1
        })
    },

    clearFn (val) {
      this.$emit('input', '')
    },

    getOptionLabel (opt) {
      if ((opt.description !== '') && (opt.description !== undefined)) {
        return opt.label + ' - ' + opt.description
      } else {
        if ((opt.label !== 'null') && (opt.label !== 'null - null')) {
          return opt.label || ''
        }
      }
      return ''
    },

    setModel (val) {
      // console.log(val)
    },

    getSelectedLabel () {
      const opt = this.options.filter(opt => opt.value === this.value)
      if (opt[0] !== undefined) {
        return opt[0].label
      } else {
        return null
      }
    }
  }
}

</script>

<style scoped>

</style>
