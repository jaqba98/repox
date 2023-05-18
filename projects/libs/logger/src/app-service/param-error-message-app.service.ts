import { singleton } from "tsyringe";
import {
  BuildParamErrorMessageService
} from "../dom-service/builder/build-param-error-message.service";
import {
  BuildMessageService
} from "../dom-service/builder/build-message.service";
import { WriteMessageService } from "../infra/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";

@singleton()
/**
 * The app service is responsible for
 * displaying param error message on the screen.
 */
export class ParamErrorMessageAppService {
  constructor(
    private readonly buildParamError: BuildParamErrorMessageService,
    private readonly buildMessage: BuildMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeParamError(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>,
    errors: Array<string>,
    tips: Array<string>
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [
        {
          message: [{
            value: "Failed to run program!",
            underscore: false
          }],
          mode: LoggerModeEnum.error,
          isHeader: true,
          isLogo: true,
          headerContent: "ERROR",
          newline: 0
        },
        {
          message: this.buildParamError.build(
            wrongParamIndexes,
            baseValues
          ),
          mode: LoggerModeEnum.error,
          isLogo: false,
          isHeader: false,
          headerContent: "",
          newline: 1
        },
        {
          message: errors.map(error => ({
            value: error,
            underscore: true
          })),
          mode: LoggerModeEnum.error,
          isLogo: false,
          isHeader: true,
          headerContent: "ERR",
          newline: 0
        },
        {
          message: tips.map(error => ({
            value: error,
            underscore: true
          })),
          mode: LoggerModeEnum.warning,
          isLogo: false,
          isHeader: true,
          headerContent: "TIP",
          newline: 0
        }
      ]
    });
    this.writeMessage.write(outputMessage);
  }
}
