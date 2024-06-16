import { InjectionToken, container, singleton } from "tsyringe";

import { ActionModel } from "../model/action.model";

@singleton()
export class RunActionsService {
  run(actions: InjectionToken<ActionModel>[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = container.resolve(actions[i]);
      const before = action.before();
      const run = action.run();
      const after = action.after();
    }
  }
}
