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
import { LoggerLineModel } from "../model/logger-domain.model";

@singleton()
/**
 * The logger app service is responsible for
 * displaying message success on the screen.
 */
export class LoggerMessageAppService {
  constructor(
    private readonly buildParamErrorMsg: BuildParamErrorMsgService,
    private readonly buildMessage: BuildMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  write(line: LoggerLineModel): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [line]
    });
    this.writeMessage.write(outputMessage);
  }
}
