import { singleton } from "tsyringe";
import {
  BuildMessageService
} from "../dom-service/service/build-message.service";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import {
  BuildParamErrorMsgService
} from "../dom-service/service/build-param-error-msg.service";

@singleton()
/**
 * The logger app service is responsible for
 * displaying param error message on the screen.
 */
export class LoggerParamErrorAppService {
  constructor(
    private readonly buildParamErrorMsg: BuildParamErrorMsgService,
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
          message: "Failed to run program!",
          mode: LoggerModeEnum.error,
          isHeader: true,
          isLogo: true,
          headerContent: "ERROR",
          newline: 0
        },
        {
          message: this.buildParamErrorMsg.build(
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
          message: errors,
          mode: LoggerModeEnum.error,
          isLogo: false,
          isHeader: true,
          headerContent: "ERR",
          newline: 0
        },
        {
          message: tips,
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
