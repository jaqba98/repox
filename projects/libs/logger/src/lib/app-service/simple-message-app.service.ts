import { singleton } from "tsyringe";

import { EMPTY_STRING, StatusEnum } from "@lib/core";
import { BuildSimpleMessageService } from "../dom-service/build-simple-message.service";
import { WriteMessageService } from "../infrastructure/write-message.service";
import {
  DEFAULT_HEADER,
  ERROR_HEADER,
  INFO_HEADER,
  SUCCESS_HEADER,
  WARNING_HEADER
} from "../const/header.const";

@singleton()
export class SimpleMessageAppService {
  constructor(
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {}

  writeSuccess(message: string) {
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, SUCCESS_HEADER, message, StatusEnum.success);
    this.writeMessage.write(output);
  }

  writeWarning(message: string) {
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, WARNING_HEADER, message, StatusEnum.warning);
    this.writeMessage.write(output);
  }

  writeError(message: string) {
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, ERROR_HEADER, message, StatusEnum.error);
    this.writeMessage.write(output);
  }

  writeInfo(message: string) {
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, INFO_HEADER, message, StatusEnum.info);
    this.writeMessage.write(output);
  }

  writeDefault(message: string) {
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, DEFAULT_HEADER, message, StatusEnum.default);
    this.writeMessage.write(output);
  }
}
