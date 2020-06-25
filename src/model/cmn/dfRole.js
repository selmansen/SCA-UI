import { Model, ModelList } from './model'
import DfRoleUsr from './dfRoleUsr'

class DfRole extends Model {
  ID = null
  Typ = ''
  Code = ''
  Title = ''
  IsActive = true
  GrpID = null
  GrpCode = ''
  ClsID = null
  ClsCode = ''
  SpeID = null
  SpeCode = ''
  Notes = ''
  IsSystem = false

  DfUsrs = new ModelList(new DfRoleUsr(''))
  constructor (endPoint) {
    super(endPoint)
    this._ignoredFieldsOnPost = ['GrpCode', 'ClsCode', 'SpeCode']
    this._ignoredTableColumns = ['Typ']
  }
}

export default DfRole

