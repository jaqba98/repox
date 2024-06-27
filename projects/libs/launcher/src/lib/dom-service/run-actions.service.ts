import { container, singleton } from "tsyringe";

import { SimpleMessageAppService } from "@lib/logger";
import { StatusEnum } from "@lib/core";
import { ActionType } from "../type/action.type";
import { ActionResultModel } from "../model/action.model";

@singleton()
export class RunActionsService {
  constructor(private readonly simpleMessageApp: SimpleMessageAppService) {}

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

  private writeResult(action: ActionResultModel) {
    switch(action.loggerStatus) {
    case StatusEnum.success:
      this.simpleMessageApp.writeSuccess(action.message);  
      return;
    case StatusEnum.warning:
      this.simpleMessageApp.writeWarning(action.message);  
      return;
    case StatusEnum.error:
      this.simpleMessageApp.writeError(action.message);
      return;
    case StatusEnum.info:
      this.simpleMessageApp.writeInfo(action.message);
      return;
    case StatusEnum.default:
      this.simpleMessageApp.writeDefault(action.message);
      return;
    default:
      throw new Error("Not supported logger status!");
    }
  }
}
