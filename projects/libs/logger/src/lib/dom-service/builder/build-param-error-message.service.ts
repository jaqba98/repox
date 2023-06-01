import { singleton } from "tsyringe";
import {
  LoggerLineMessageModel
} from "../../model/logger-domain.model";
import { PARAM_PREFIX } from "../../const/symbol.const";

@singleton()
/**
 * The builder service is responsible for building
 * param error data for message (DTO and domain).
 */
export class BuildParamErrorMessageService {
  build(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>
  ): Array<LoggerLineMessageModel> {
    const message: Array<LoggerLineMessageModel> = baseValues
      .map((param, index): {
        value: string,
        underscore: boolean
      } => ({
        value: param,
        underscore: wrongParamIndexes.includes(index)
      }))
      .filter((_, index): boolean => index > 1);
    return [{ value: PARAM_PREFIX, underscore: false }, ...message];
  }
}
// todo: refactor