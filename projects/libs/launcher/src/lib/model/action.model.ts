import { ActionStatusEnum } from "../enum/action.enum";

export interface ActionModel {
  before: () => ActionResultModel;

  run: () => ActionResultModel;

  after: () => ActionResultModel;
}

export interface ActionResultModel {
  status: ActionStatusEnum;
}
