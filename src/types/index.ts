import LOG_TYPE from '../config/logType'

export interface Options {
  checkDevEnv?: () => boolean
}

export type LogMap = Array<{
  type: LOG_TYPE
  content: any[]
}>
