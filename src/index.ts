import PREFIX from './config/prefix'
import { Options } from './types'
import isStopLog from './utils/isStopLog'

export default class Logger {
  public isDevEnv = true

  constructor(options: Options = {}) {
    const { checkDevEnv } = options
    this.isDevEnv = checkDevEnv?.() || true
  }

  info(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    console.log(...PREFIX.INFO, ...input)
  }

  debug(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    if (!this.isDevEnv) {
      return
    }

    console.log(...PREFIX.DEBUG, ...input)
  }

  warn(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    console.log(...PREFIX.WARN, ...input)
  }

  error(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    console.log(...PREFIX.ERROR, ...input)
  }
}
