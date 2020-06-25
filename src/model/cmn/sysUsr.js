import { Model } from './model'

class SysUsr extends Model {
  ID = null
  Code = ''
  Upass = ''
  FullName = ''
  Email = ''
  Mobile = ''
  GrpID = null
  GrpCode = ''
  ClsID = null
  ClsCode = ''
  SpeID = null
  SpeCode = ''
  IsActive = true

  constructor (endPoint) {
    super(endPoint)
    this._ignoredFieldsOnPost = ['GrpCode', 'ClsCode', 'SpeCode']
    this._ignoredTableColumns = ['Upass']
  }
}

export default SysUsr
