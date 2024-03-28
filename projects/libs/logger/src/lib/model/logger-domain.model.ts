import { type LoggerModeEnum } from '../enum/logger-mode.enum'

/**
 * The logger domain model that stores data.
 * It will be used to build a complete message
 * to be displayed on the console screen.
 */

export interface LoggerWordModel {
  content: string
  underscore: boolean
}

export interface LoggerHeaderModel {
  content: string
  visible: boolean
}

export interface LoggerLineModel {
  mode: LoggerModeEnum
  logo: LoggerHeaderModel
  header: LoggerHeaderModel
  words: LoggerWordModel[]
  newline: number
}

export interface LoggerDomainModel {
  lines: LoggerLineModel[]
}
