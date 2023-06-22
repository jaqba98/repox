import { singleton } from "tsyringe";
import {
  LoggerWordModel
} from "../../model/logger-domain.model";
import { PARAM_PREFIX } from "@lib/const";

@singleton()
/**
 * The builder service is responsible for building
 * param error data for message (DTO and domain).
 */
export class BuildParamErrorMessageService {
  build(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>
  ): Array<LoggerWordModel> {
    const message: Array<LoggerWordModel> = baseValues
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
