import { singleton } from "tsyringe";

import {
  RunActionsService
} from "../dom-service/run-actions.service";
import { ActionType } from "../type/action.type";

@singleton()
export class LauncherAppService {
  constructor(private readonly runActions: RunActionsService) {}

  launch(actions: ActionType[]) {
    this.runActions.run(actions);
  }
}
