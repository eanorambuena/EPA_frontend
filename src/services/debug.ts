import { PRODUCTION } from './variables'

export default class Debug {
  static log(message: string, color?) {
    if (PRODUCTION) return
    if (color){
      return console.log(`%c${message}`, `color: ${color}`)
    }
    console.log(message)
  }
}
