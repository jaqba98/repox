import { InjectionToken, container, singleton } from "tsyringe";

import {
  ActionModel,
  ActionResultModel
} from "../model/action.model";
import { ActionStatusEnum } from "../enum/action.enum";

@singleton()
export class RunActionsService {
  run(actions: InjectionToken<ActionModel>[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = container.resolve(actions[i]);
      const before = action.before();
      if (this.actionIsFailed(before)) break;
      const run = action.run();
      if (this.actionIsFailed(run)) break;
      const after = action.after();
      if (this.actionIsFailed(after)) break;
    }
  }

  actionIsFailed(result: ActionResultModel) {
    if (result.status === ActionStatusEnum.completed) return false;
    return true;
  }
}
