import { InjectionToken, container, singleton } from "tsyringe";

import { ActionModel } from "../model/action.model";

@singleton()
export class LauncherAppService {
  run(actions: InjectionToken<ActionModel>[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = container.resolve(actions[i]);
      action.before();
      action.run();
      action.after();
    }
  }
}
