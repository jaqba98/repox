import { container, singleton } from "tsyringe";

import { LoggerModeEnum } from "@lib/logger";

import { ActionType } from "../type/action.type";
import { ActionResultModel } from "../model/action.model";
import { ActionStatusEnum } from "../enum/action.enum";

@singleton()
export class RunActionsService {
  run(actions: ActionType[]) {
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
    this.writeResult(action);
    if (action.status === ActionStatusEnum.completed) {
      this.run(action.actions);
      return true;
    }
    return false;
  }

  // TODO: refactor it, use logger module instead of console log!
  private writeResult(action: ActionResultModel) {
    switch (action.loggerMode) {
    case LoggerModeEnum.error:
      console.log(`Error: ${action.message}`);
      return;
    case LoggerModeEnum.success:
      console.log(`Success: ${action.message}`);
      return;
    case LoggerModeEnum.warning:
      console.log(`Warning: ${action.message}`);
      return;
    case LoggerModeEnum.info:
      console.log(`Info: ${action.message}`);
      return;
    case LoggerModeEnum.plain:
      console.log(action.message);
      return;
    default:
      throw new Error("Not supported logger mode!");
    }
  }
}
