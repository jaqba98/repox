import { StatusEnum  } from "@lib/core";
import { ActionType } from "../type/action.type";

export interface ActionModel {
  runBefore: () => ActionResultModel;

  runLogic: () => ActionResultModel;

  runAfter: () => ActionResultModel;
}

export interface ActionResultModel {
  status: StatusEnum.success | StatusEnum.error;
  message: string;
  loggerStatus: StatusEnum;
  actions: ActionType[];
}
