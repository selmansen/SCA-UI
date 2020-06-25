import Vue from 'vue'
import router from '../../router'
import { catchAxiosError, showAxiosError } from 'src/lib/cmn/axios'

// todo: optimize code
// make post type property ( as form / as params / as body )

export class Model {
  _endPoint = ''
  _ignoredFieldsOnPost = []
  _ignoredFieldsOnRead = []
  _tableColumns = []
  _ignoredTableColumns = []
  _rules = {
    required: val => !!val || 'Required field',
    date: val => /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(val) || 'Wrong date format'
  }

  /* colOptions
  colOptions.FieldName: {
    align:
    style:
    label:
  }
  */
  _colOptions = {}

  // dfattr kaydı için oluşturulan özellik. dfAttr componetinde kullanılıyor.
  _attrs = []

  constructor (endPoint) {
    this._endPoint = endPoint
  }

  getFields () {
    const keys = Object.keys(this).filter(fld => fld.charAt(0) !== '_')
    return keys
  }

  getTableColumns () {
    const self = this

    if (self._tableColumns.length > 0) {
      return self._tableColumns
    } else {
      // add action col
      const col = {
        name: 'action',
        align: 'left',
        style: 'width: 50px'
      }
      self._tableColumns.push(col)

      this.getFields().forEach(function (fld) {
        const skip = (fld.endsWith('ID') && fld.length > 2 && !fld.endsWith('UUID')) || fld === 'Notes' || self._ignoredTableColumns.includes(fld)
        if (!skip) {
          const col = {
            name: fld,
            sortable: true,
            label: fld,
            field: fld,
            align: 'left'
          }
          if (fld === 'ID') {
            col.align = 'right'
            col.style = 'width: 75px'
          }

          if (self._colOptions.hasOwnProperty(fld)) {
            col.align = self._colOptions[fld].align || 'left'
            col.style = self._colOptions[fld].style || ''
            col.label = self._colOptions[fld].label || col.label
          }

          self._tableColumns.push(col)
        }
      })
      return self._tableColumns
    }
  }

  save () {
    const self = this
    let method = ''
    let finalEndPoint = ''
    if (this.ID === null || this.ID === undefined || this.ID === '') {
      // create new record
      method = 'post'
      finalEndPoint = this._endPoint
    } else {
      // update record
      method = 'put'
      finalEndPoint = this._endPoint + '/' + this.ID
    }

    const data = {}
    this.getFields().forEach(function (fld) {
      if (!self._ignoredFieldsOnPost.includes(fld)) {
        if (self[fld] instanceof ModelList) {
          data[fld] = {
            deletedRows: self[fld]._deletedRows,
            updatedRows: self[fld]._updatedRows,
            rows: self[fld]._rows
          }
        } else {
          data[fld] = self[fld]
        }
      }
    })

    // put attrs
    data['xat'] = this._attrs

    Vue.prototype.$q.loading.show({ delay: 400 })
    Vue.prototype.$axios({
      method: method,
      url: finalEndPoint,
      // params: data,
      data: data
    })
      .then(function (response) {
        if (response.data.Success) {
          router.push(self._endPoint)
        } else {
          showAxiosError(response)
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
      .finally(() => {
        Vue.prototype.$q.loading.hide()
      })
  }

  saveForm (contentType) {
    contentType = contentType || 'application/x-www-form-urlencoded'
    const self = this
    let method = ''
    let finalEndPoint = ''
    if (this.ID === null || this.ID === undefined || this.ID === '') {
      // create new record
      method = 'post'
      finalEndPoint = this._endPoint
    } else {
      // update record
      method = 'put'
      finalEndPoint = this._endPoint + '/' + this.ID
    }

    const fd = new FormData()

    this.getFields().forEach(function (fld) {
      if (!self._ignoredFieldsOnPost.includes(fld)) {
        if ((method === 'post') && (fld === 'ID')) {
          // if creating new record do not add field
        } else {
          fd.append(fld, self[fld])
        }
      }
    })

    Vue.prototype.$q.loading.show({ delay: 400 })
    Vue.prototype.$axios({
      method: method,
      url: finalEndPoint,
      // params: data,
      contentType: contentType,
      data: fd
    })
      .then(function (response) {
        if (response.data.Success) {
          router.push(self._endPoint)
        } else {
          showAxiosError(response)
        }
      })
      .catch((error) => {
        catchAxiosError(error)
      })
      .finally(() => {
        Vue.prototype.$q.loading.hide()
      })
  }

  async delete (id) {
    try {
      const response = await Vue.prototype.$axios.delete(this._endPoint, {
        params: { id: id }
      })
      return response.data.Success
    } catch (err) {
      catchAxiosError(err)
      return false
    }
  }

  read (id) {
    const adr = this._endPoint + '/' + id.toString()
    Vue.prototype.$q.loading.show({ delay: 400 })
    return Vue.prototype.$axios.get(adr)
      .then(response => {
        this.getFields().forEach(fld => {
          if (!this._ignoredFieldsOnRead.includes(fld)) {
            if (this[fld] instanceof ModelList) {
              this[fld].load(response.data.Data[fld])
            } else {
              this[fld] = response.data.Data[fld]
            }
          }
          return true
        })
      })
      .catch(function (error) {
        catchAxiosError(error)
        return false
      })
      .finally(() => {
        Vue.prototype.$q.loading.hide()
      })
  }

}



export class ModelList {
  _updatedRows = []
  _deletedRows = []
  _rows = []
  _model = null
  _maxID = 0

  constructor (model) {
    this._model = model
  }

  load (data) {
    const self = this
    if ((data !== undefined) && (data !== null)) {
      data.rows.forEach(function (row) {
        self._rows.push(row)
      })
    }
  }

  addRow () {
    const self = this
    const emptyRow = {}
    this._model.getFields().forEach(function (fld) {
      emptyRow[fld] = self._model[fld]
    })
    this._maxID -= 1
    emptyRow.ID = this._maxID
    this._rows.push(emptyRow)
    return emptyRow
  }

  delRow (id) {
    const deleteIndex = this._rows.findIndex(item => item.ID === id)
    this._rows.splice(deleteIndex, 1)
    if (id > 0) {
      this._deletedRows.push(id)
    }
  }

  updRow (id) {
    if ((id > 0) && (!this._updatedRows.includes(id))) {
      this._updatedRows.push(id)
    }
  }

  postAsTable () {
    return Vue.prototype.$axios({
      method: 'post',
      url: this._model._endPoint,
      // params: data,
      data: {
        deletedRows: this._deletedRows,
        updatedRows: this._updatedRows,
        rows: this._rows
      }
    })
      .then(response => {
        if (response.data.Success) {
          for (const [key, value] of Object.entries(response.data.Data)) {
            this._rows.filter(item => item.ID === parseInt(key)).forEach(rw => {
              rw.ID = value
            })
            // console.log(key, value)
          }
          return true
        } else {
          showAxiosError(response)
          return false
        }
      })
      .catch((error) => {
        catchAxiosError(error)
        return false
      })
      .finally(() => {
        //
      })
  }

  getAsTable () {
    return Vue.prototype.$axios({
      get: 'post',
      url: this._model._endPoint,
      // params: data,
      data: {}
    })
      .then((response) => {
        if (response.data.Success) {
          this._rows.length = 0
          this._updatedRows = []
          this._deletedRows = []
          response.data.Data.rows.forEach(rw => {
            this._rows.push(rw)
          })
          return true
        } else {
          showAxiosError(response)
          return false
        }
      })
      .catch((error) => {
        catchAxiosError(error)
        return false
      })
      .finally(() => {
        //
      })
  }
}
