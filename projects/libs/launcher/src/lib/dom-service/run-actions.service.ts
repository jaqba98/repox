import { container, singleton } from "tsyringe";

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
    if (action.status === ActionStatusEnum.completed) {
      this.run(action.actions);
      return true;
    }
    return false;
  }
}
