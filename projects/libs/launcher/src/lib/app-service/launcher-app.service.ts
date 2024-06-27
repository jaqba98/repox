import { container, singleton } from "tsyringe";

import { ActionType } from "../type/action.type";
import { EMPTY_STRING, StatusEnum } from "@lib/core";
import { ActionResultModel } from "../model/action.model";
import {
  BuildSimpleMessageService,
  DEFAULT_HEADER,
  WriteMessageService
} from "@lib/logger";

@singleton()
export class LauncherAppService {
  constructor(
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {}

  launch(actions: ActionType[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = container.resolve(actions[i]);
      const resultBefore = action.runBefore();
      if (!this.runResult(resultBefore)) return;
      const resultLogic = action.runLogic();
      if (!this.runResult(resultLogic)) return;
      const resultAfter = action.runAfter();
      if (!this.runResult(resultAfter)) return;
    }
  }

  private runResult(action: ActionResultModel) {
    const message = this.buildSimpleMessage.build(
      EMPTY_STRING,
      DEFAULT_HEADER,
      action.message,
      StatusEnum.default
    );
    this.writeMessage.write(message);
    if (action.status === StatusEnum.success) {
      this.launch(action.actions);
      return true;
    }
    return false;
  }
}
