import { singleton } from 'tsyringe'

import { type LoggerWordModel } from '../../model/logger-domain.model'

@singleton()
/**
 * The builder service is responsible for building
 * param error data for message (DTO and domain).
 */
export class BuildParamErrorMessageService {
  build (
    wrongParamIndexes: number[],
    baseValues: string[],
    logo: string
  ): LoggerWordModel[] {
    const prefixContent = `> ${logo.toLowerCase()}`
    const words: LoggerWordModel[] = baseValues
      .map((param, index): LoggerWordModel => ({
        content: param,
        underscore: wrongParamIndexes.includes(index)
      }))
    return [{ content: prefixContent, underscore: false }, ...words]
  }
}
