import { StatusEnum } from "@lib/core";

export interface LoggerWordModel {
  content: string
  underscore: boolean
}

export interface LoggerHeaderModel {
  content: string
  visible: boolean
}

export interface LoggerLineModel {
  status: StatusEnum
  logo: LoggerHeaderModel
  header: LoggerHeaderModel
  words: LoggerWordModel[]
  newline: number
}

export interface LoggerDomainModel {
  lines: LoggerLineModel[]
}
