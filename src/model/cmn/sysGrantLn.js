import { Model } from './model'

class SysGrantLn extends Model {
  ID = null
  SysgrantID = null
  DfRoleID = null
  DfRoleCode = ''
  DfRoleTitle = ''
  Mget = ''
  Mput = ''
  Mpost = ''
  Mdelete = ''
  Rules = ''
  constructor (endPoint) {
    super(endPoint)
    this._ignoredFieldsOnPost = ['GrpCode', 'ClsCode', 'SpeCode']
  }
}

export default SysGrantLn
