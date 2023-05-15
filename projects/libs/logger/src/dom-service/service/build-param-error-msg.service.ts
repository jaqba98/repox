import { singleton } from "tsyringe";
import {
  LoggerLineMessageModel
} from "../../model/logger-domain.model";

@singleton()
/**
 * The service is responsible for building
 * param error data for message.
 */
export class BuildParamErrorMsgService {
  build(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>
  ): Array<LoggerLineMessageModel> {
    const message: Array<LoggerLineMessageModel> = baseValues
      .map((param, index) => ({
        value: param,
        underscore: wrongParamIndexes.includes(index)
      }))
      .filter((_, index) => index > 1);
    return [{ value: "> repox", underscore: false }, ...message];
  }
}
// todo: refactor