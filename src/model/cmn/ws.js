import { uuidv4 } from '../../lib/cmn/uuid'

class WS {
  TUUID = null
  MUUID = null
  Command = null
  ErrorNo = null
  Message = ''
  Data = null

  conn = null
  endPoint = null

  constructor (endPoint, tuuid) {
    this.endPoint = endPoint
    if (tuuid === '' || tuuid === undefined || tuuid === null) {
      this.TUUID = uuidv4()
    }
  }

  open () {
    if (this.conn == null) {
      this.conn = new WebSocket(this.endPoint)
    }
  }

  close () {
    if (this.conn !== null) {
      this.conn.onclose = () => {} // disable onclose handler first
      this.conn.close()
      this.conn = null
    }
  }

  send ({ cmd, errorNo, message, data } = {}) {
    let msg = {
      TUUID: this.TUUID,
      MUUID: uuidv4(),
      Command: cmd,
      ErrorNo: errorNo || 0,
      Message: message || '',
      Data: data || {}
    }

    this.conn.send(JSON.stringify(msg))
  }
}

export default WS
