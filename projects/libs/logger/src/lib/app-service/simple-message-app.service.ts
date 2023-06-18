import { singleton } from "tsyringe";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import { EMPTY_STRING, NEW_LINE } from "@lib/const";
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
    newline: number,
    isLogo: boolean,
    isHeader: boolean,
    headerContent: string = "SUCCESS"
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.success,
      isLogo,
      isHeader,
      headerContent,
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeError(
    message: string,
    newline: number,
    isLogo: boolean,
    isHeader: boolean,
    headerContent: string = "ERROR"
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.error,
      isLogo,
      isHeader,
      headerContent,
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeWarning(
    message: string,
    newline: number,
    isLogo: boolean,
    isHeader: boolean,
    headerContent: string = "WARNING"
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.warning,
      isLogo,
      isHeader,
      headerContent,
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writeInfo(
    message: string,
    newline: number,
    isLogo: boolean,
    isHeader: boolean,
    headerContent: string = "INFO"
  ): void {
    const outputMessage: string = this.buildSimpleMessage.build(
      message,
      LoggerModeEnum.info,
      isLogo,
      isHeader,
      headerContent,
      newline
    );
    this.writeMessage.write(outputMessage);
  }

  writePlain(message: string, newline: number = 0): void {
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

  writeNewline(): void {
    this.writeMessage.write(NEW_LINE);
  }
}
