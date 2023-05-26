import { singleton } from "tsyringe";
import { WriteMessageService } from "../infra/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import { EMPTY_STRING } from "../const/symbol.const";
import {
  BuildSimpleMessageService
} from "../dom-service/builder/build-simple-message.service";

@singleton()
/**
 * The app service is responsible for
 * displaying simple message on the screen.
 */
export class SimpleMessageAppService {
  constructor(
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeSuccess(
    message: string,
    isLogo: boolean,
    isHeader: boolean,
    newline: number
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.success,
      isLogo,
      isHeader,
      "SUCCESS",
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeError(
    message: string,
    isLogo: boolean,
    isHeader: boolean,
    newline: number
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.error,
      isLogo,
      isHeader,
      "ERROR",
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeWarning(
    message: string,
    isLogo: boolean,
    isHeader: boolean,
    newline: number
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.warning,
      isLogo,
      isHeader,
      "WARNING",
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeInfo(
    message: string,
    isLogo: boolean,
    isHeader: boolean,
    newline: number
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.info,
      isLogo,
      isHeader,
      "INFO",
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writePlain(message: string, newline: number): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.plain,
      false,
      false,
      EMPTY_STRING,
      newline
    );
    this.writeMessage.write(outputMessage);
  }
}
