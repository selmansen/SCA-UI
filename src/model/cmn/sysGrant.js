import { Model, ModelList } from './model'
import SysGrantLn from './sysGrantLn'

class SysGrant extends Model {
  ID = null
  Url = ''
  Title = ''
  Methods = ''

  Lns = new ModelList(new SysGrantLn(''))

  constructor (endPoint) {
    super(endPoint)
    this._ignoredFieldsOnPost = ['GrpCode', 'ClsCode', 'SpeCode']
  }
}

export default SysGrant
