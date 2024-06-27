import { container, singleton } from "tsyringe";

import { StatusEnum } from "@lib/core";
import { ActionType } from "../type/action.type";
import { ActionResultModel } from "../model/action.model";

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
    if (action.status === StatusEnum.success) {
      this.run(action.actions);
      return true;
    }
    return false;
  }

  // TODO: refactor it, use logger module instead of console log!
  private writeResult(action: ActionResultModel) {
    switch (action.loggerStatus) {
    case StatusEnum.error:
      console.log(`Error: ${action.message}`);
      return;
    case StatusEnum.success:
      console.log(`Success: ${action.message}`);
      return;
    case StatusEnum.warning:
      console.log(`Warning: ${action.message}`);
      return;
    case StatusEnum.info:
      console.log(`Info: ${action.message}`);
      return;
    case StatusEnum.default:
      console.log(action.message);
      return;
    default:
      throw new Error("Not supported logger mode!");
    }
  }
}
