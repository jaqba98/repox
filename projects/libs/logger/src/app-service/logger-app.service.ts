import { singleton } from "tsyringe";
import {
  BuildMessageService
} from "../dom-service/build-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";

@singleton()
/**
 * The logger service is responsible for displaying
 * the prepared message on the screen.
 */
export class LoggerAppService {
  constructor(
    private readonly buildMessage: BuildMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeSimpleMessage(
    message: string,
    mode: keyof typeof LoggerModeEnum,
    isLogo: boolean,
    isHeader: boolean
  ): void {
    const output = this.buildMessage.buildSimpleMessage({
      message,
      mode: <LoggerModeEnum>mode,
      isLogo,
      isHeader
    });
    this.writeMessage.write(output);
  }
}
// todo: refactor
