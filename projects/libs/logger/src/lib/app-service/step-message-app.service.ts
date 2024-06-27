import { singleton } from "tsyringe";

import { EMPTY_STRING, StatusEnum } from "@lib/core";
import { BuildSimpleMessageService } from "../dom-service/build-simple-message.service";
import { WriteMessageService } from "../infrastructure/write-message.service";
import { STEP_HEADER } from "../const/header.const";

@singleton()
export class StepMessageAppService {
  constructor(
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  writeStep(message: string) {
    const newMessage = `>>> ${message} <<<`;
    const output = this.buildSimpleMessage
      .build(EMPTY_STRING, STEP_HEADER, newMessage, StatusEnum.default);
    this.writeMessage.write(output);
  }
}
