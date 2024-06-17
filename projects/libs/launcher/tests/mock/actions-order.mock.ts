import { ActionStatusEnum } from "../../src/lib/enum/action.enum";
import {
  ActionModel,
  ActionResultModel
} from "../../src/lib/model/action.model";
import { ActionsOrderEnum } from "../enum/actions-order.enum";

export class ActionA implements ActionModel {
  runBefore(): ActionResultModel {
    console.log(ActionsOrderEnum.aBefore);
    return { status: ActionStatusEnum.completed, actions: [] };
  }
  runLogic(): ActionResultModel {
    console.log(ActionsOrderEnum.aLogic);
    return { status: ActionStatusEnum.completed, actions: [] };
  }
  runAfter(): ActionResultModel {
    console.log(ActionsOrderEnum.aAfter);
    return { status: ActionStatusEnum.completed, actions: [] };
  }
}
