import Vue from 'vue'
import router from '../../router'

export const catchAxiosError = function (error) {
  let errMessage

  if (error.response) {
    if (error.response.status === 404) {
      router.push('/NotFound')
      return
    }
  }

  errMessage = error.message + '<br/>'

  if (error.response) {
    if (error.response.data.Message) {
      errMessage += error.response.data.Message
    } else {
      if (error.response.data) {
        errMessage += error.response.data
      }
    }
  }

  if (process.env.DEV) {
    Vue.prototype.$log.ERROR(error, errMessage)
  }

  Vue.prototype.$q.notify({
    color: 'negative',
    position: 'top',
    message: errMessage,
    icon: 'report_problem',
    html: true
  })
}

export const showAxiosError = function (response) {
  let errMessage

  if (response.data.Message) {
    errMessage = response.data.Message
  } else {
    if (response.data) {
      errMessage = response.data
    }
  }

  if (process.env.DEV) {
    Vue.prototype.$log.ERROR('axios', errMessage)
  }

  Vue.prototype.$q.notify({
    color: 'negative',
    position: 'top',
    message: errMessage,
    icon: 'report_problem',
    html: true
  })
}

// todo: bunu sonrasında promise yapalım
// https://stackoverflow.com/questions/43463989/returning-an-axios-promise-from-function
export const getLookupVals = function (query, search, parentVal, queryType) {
  queryType = queryType || 'Code'

  return Vue.prototype.$axios.post('/lookup/' + query, {},
    {
      params: {
        search: search,
        parentVal: parentVal,
        queryType: queryType
      }
    })
    .then((response) => {
      if (response.data.Success) {
        return response.data.Data
      } else {
        showAxiosError(response)
        return []
      }
    })
    .catch((err) => {
      catchAxiosError(err)
      return []
    })
}
