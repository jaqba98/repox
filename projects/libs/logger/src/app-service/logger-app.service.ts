import { singleton } from "tsyringe";
import {
  BuildMessageService
} from "../dom-service/service/build-message.service";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";

@singleton()
/**
 * The logger app service is responsible for
 * displaying message on the screen.
 */
export class LoggerAppService {
  constructor(
    private readonly buildMessage: BuildMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeSuccessMessage(
    isLogo: boolean,
    isHeader: boolean,
    message: string
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [{
        message,
        mode: LoggerModeEnum.success,
        isLogo,
        isHeader,
        headerContent: LoggerModeEnum.success.toUpperCase(),
        newline: 0
      }]
    });
    this.writeMessage.write(outputMessage);
  }
}
