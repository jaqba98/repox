import { container, singleton } from "tsyringe";

import { ActionType } from "../type/action.type";

@singleton()
export class RunActionsService {
  run(actions: ActionType[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = container.resolve(actions[i]);
      const resultBefore = action.runBefore();
      const resultLogic = action.runLogic();
      const resultAfter = action.runAfter();
    }
  }
}
