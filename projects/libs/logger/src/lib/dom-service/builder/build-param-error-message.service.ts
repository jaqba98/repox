import { singleton } from "tsyringe";
import { LoggerWordModel } from "../../model/logger-domain.model";

@singleton()
/**
 * The builder service is responsible for building
 * param error data for message (DTO and domain).
 */
export class BuildParamErrorMessageService {
  build(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>,
    logo: string
  ): Array<LoggerWordModel> {
    const prefixContent = `> ${logo.toLowerCase()}`;
    const words: Array<LoggerWordModel> = baseValues
      .map((param, index): LoggerWordModel => ({
        content: param,
        underscore: wrongParamIndexes.includes(index)
      }))
      .filter((_, index): boolean => index > 1);
    return [{ content: prefixContent, underscore: false }, ...words];
  }
}
