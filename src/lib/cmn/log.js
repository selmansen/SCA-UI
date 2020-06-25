export class Log {
  /*
  constructor () {}

  */

  log (logLevel, message, errorCode) {
    if (process.env.DEV) {
      console.log(logLevel + ' :: ' + message)
    }

    // todo: else --> push to server !!
  }

  /* https://dzone.com/articles/logging-levels-what-they-are-and-how-they-help-you */

  FATAL (message, errorCode) {
    this.log('FATAL', message, errorCode)
  }

  ERROR (err, errMessage) {
    const msg = err + errMessage
    // todo: get error code from err ??

    this.log('ERROR', msg, 0)
  }

  WARN (message) {
    this.log('WARN', message, 0)
  }

  INFO (message) {
    this.log('INFO', message, 0)
  }

  DEBUG (message) {
    this.log('DEBUG', message, 0)
  }
}
