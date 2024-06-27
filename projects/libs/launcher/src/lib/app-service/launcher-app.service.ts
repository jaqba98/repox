import { container, singleton } from "tsyringe";

import { ActionType } from "../type/action.type";
import { StatusEnum } from "@lib/core";
import { ActionResultModel } from "../model/action.model";
import {
  BuildSimpleMessageService,
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
      if (!this.launchResult(resultBefore)) return;
      const resultLogic = action.runLogic();
      if (!this.launchResult(resultLogic)) return;
      const resultAfter = action.runAfter();
      if (!this.launchResult(resultAfter)) return;
    }
  }

  private launchResult(action: ActionResultModel) {
    const message = this.buildSimpleMessage.buildDefault(action.message);
    this.writeMessage.write(message);
    if (action.status === StatusEnum.success) {
      this.launch(action.actions);
      return true;
    }
    return false;
  }
}
