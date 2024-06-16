import { InjectionToken, singleton } from "tsyringe";

import { ActionModel } from "../model/action.model";
import {
  RunActionsService
} from "../dom-service/run-actions.service";

@singleton()
export class LauncherAppService {
  constructor(private readonly runActions: RunActionsService) {}

  launch(actions: InjectionToken<ActionModel>[]) {
    this.runActions.run(actions);
  }
}
