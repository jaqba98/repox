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
import {
  BuildLineService
} from "../dom-service/builder/build-line.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import {
  BuildSimpleMessageService
} from "../dom-service/builder/build-simple-message.service";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The app service is responsible for displaying
 * param error message on the console screen.
 */
export class ParamErrorMessageAppService {
  constructor(
    private readonly buildMessage: BuildMessageService,
    private readonly buildLines: BuildLineService,
    private readonly buildParamError: BuildParamErrorMessageService,
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeParamError(
    wrongParamIndexes: Array<number>,
    baseValues: Array<string>,
    errors: Array<string>,
    tips: Array<string>,
    logo: string
  ): void {
    const outputMessage = this.buildMessage.build({
      lines: [
        {
          mode: LoggerModeEnum.error,
          logo: { visible: true, content: logo },
          header: {
            visible: true,
            content: LoggerModeEnum.error.toUpperCase()
          },
          words: [
            { content: "Failed to run program!", underscore: false }
          ],
          newline: 1
        },
        {
          mode: LoggerModeEnum.error,
          logo: { visible: false, content: EMPTY_STRING },
          header: { visible: false, content: EMPTY_STRING },
          words: this.buildParamError.build(
            wrongParamIndexes,
            baseValues,
            logo
          ),
          newline: 1
        },
        ...this.buildLines.buildErrorLines(errors),
        ...this.buildLines.buildTipLines(tips)
      ]
    });
    this.writeMessage.write(outputMessage);
  }
}
