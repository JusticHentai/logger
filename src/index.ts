import LOG_TYPE from './config/logType'
import PREFIX from './config/prefix'
import { LogMap, Options } from './types'
import isStopLog from './utils/isStopLog'

export default class Logger {
  public isDevEnv = true
  public logMap: LogMap = []

  constructor(options: Options = {}) {
    const { checkDevEnv } = options
    this.isDevEnv = checkDevEnv?.() || true
  }

  info(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    this.logMap.push({
      type: LOG_TYPE.INFO,
      content: input,
    })

    console.log(...PREFIX.INFO, ...input)
  }

  debug(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    if (!this.isDevEnv) {
      return
    }

    this.logMap.push({
      type: LOG_TYPE.DEBUG,
      content: input,
    })

    console.log(...PREFIX.DEBUG, ...input)
  }

  warn(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    this.logMap.push({
      type: LOG_TYPE.WARN,
      content: input,
    })

    console.log(...PREFIX.WARN, ...input)
  }

  error(...input: any[]) {
    if (isStopLog(input)) {
      return
    }

    this.logMap.push({
      type: LOG_TYPE.ERROR,
      content: input,
    })

    console.log(...PREFIX.ERROR, ...input)
  }

  log(options: { filterType?: LOG_TYPE[]; canLog?: boolean } = {}) {
    const {
      filterType = [
        LOG_TYPE.INFO,
        LOG_TYPE.DEBUG,
        LOG_TYPE.WARN,
        LOG_TYPE.ERROR,
      ],
      canLog = true,
    } = options

    if (!canLog) {
      return
    }

    const newLogMap = this.logMap.filter((log) => {
      return filterType.includes(log.type)
    })

    console.log(...PREFIX.LOG, newLogMap)
  }
}
