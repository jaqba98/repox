import { singleton } from "tsyringe";
import {
  BuildMessageService
} from "../dom-service/service/build-message.service";
import {
  WriteMessageService
} from "../infra/write-message.service";
import {
  BuildParamErrorMsgService
} from "../dom-service/service/build-param-error-msg.service";
import { LoggerLineModel } from "../model/logger-domain.model";
import { LoggerModeEnum } from "../enum/logger-mode.enum";

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

  writeSuccess(
    message: string,
    newline: number
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [{
        message,
        mode: LoggerModeEnum.success,
        isLogo: false,
        isHeader: true,
        headerContent: "SUCCESS",
        newline
      }]
    });
    this.writeMessage.write(outputMessage);
  }

  writeError(
    message: string,
    newline: number
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [{
        message,
        mode: LoggerModeEnum.error,
        isLogo: false,
        isHeader: true,
        headerContent: "ERROR",
        newline
      }]
    });
    this.writeMessage.write(outputMessage);
  }

  writeInfo(
    message: string,
    isLogo: boolean,
    isHeader: boolean,
    newline: number
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [{
        message,
        mode: LoggerModeEnum.info,
        isLogo,
        isHeader,
        headerContent: "INFO",
        newline
      }]
    });
    this.writeMessage.write(outputMessage);
  }

  writePlain(
    message: string,
    newline: number
  ): void {
    const outputMessage: string = this.buildMessage.build({
      lines: [{
        message,
        mode: LoggerModeEnum.plain,
        isLogo: false,
        isHeader: false,
        headerContent: "",
        newline
      }]
    });
    this.writeMessage.write(outputMessage);
  }
}
// todo: refactor