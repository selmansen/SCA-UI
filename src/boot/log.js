import { Log } from '../lib/cmn/log'

export default async ({ Vue }) => {
  Vue.prototype.$log = new Log()
}
