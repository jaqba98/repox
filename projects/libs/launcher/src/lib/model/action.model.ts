import { LoggerModeEnum } from "@lib/logger";

import { ActionStatusEnum } from "../enum/action.enum";
import { ActionType } from "../type/action.type";

export interface ActionModel {
  runBefore: () => ActionResultModel;

  runLogic: () => ActionResultModel;

  runAfter: () => ActionResultModel;
}

export interface ActionResultModel {
  status: ActionStatusEnum;
  message: string;
  loggerMode: LoggerModeEnum;
  actions: ActionType[];
}
