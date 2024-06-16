import { singleton, InjectionToken } from "tsyringe";

import {
  RunActionsService
} from "../dom-service/run-actions.service";
import { ActionModel } from "../model/action.model";

@singleton()
export class LauncherAppService {
  constructor(private readonly runActions: RunActionsService) {}

  launch(actions: InjectionToken<ActionModel>[]) {
    this.runActions.run(actions);
  }
}
