import { Model, ModelList } from './model'
import SysRoleUsr from './sysRoleUsr'

class SysRole extends Model {
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

  DfUsrs = new ModelList(new SysRoleUsr(''))
  constructor (endPoint) {
    super(endPoint)
    this._ignoredFieldsOnPost = ['GrpCode', 'ClsCode', 'SpeCode']
    this._ignoredTableColumns = ['Typ']
  }
}

export default SysRole

