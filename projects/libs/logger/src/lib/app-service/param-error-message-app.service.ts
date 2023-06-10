import { singleton } from "tsyringe";
import {
  BuildParamErrorMessageService
} from "../dom-service/builder/build-param-error-message.service";
import {
  BuildMessageService
} from "../dom-service/builder/build-message.service";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import {
  BuildLinesService
} from "../dom-service/builder/build-lines.service";
import { EMPTY_STRING } from "projects/libs/const/src";

@singleton()
/**
 * The app service is responsible for
 * displaying param error message on the screen.
 */
export class ParamErrorMessageAppService {
  constructor(
    private readonly buildParamError: BuildParamErrorMessageService,
    private readonly buildMessage: BuildMessageService,
    private readonly writeMessage: WriteMessageService,
    private readonly buildLines: BuildLinesService
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
          headerContent: EMPTY_STRING,
          newline: 1
        },
        ...this.buildLines.buildErrorLines(errors),
        ...this.buildLines.buildTipLines(tips)
      ]
    });
    this.writeMessage.write(outputMessage);
  }
}
