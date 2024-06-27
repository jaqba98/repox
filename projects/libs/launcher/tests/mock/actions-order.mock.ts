import { StatusEnum } from "@lib/core";

import {
  ActionModel,
  ActionResultModel
} from "../../src/lib/model/action.model";
import { ActionsOrderEnum } from "../enum/actions-order.enum";

// Action 1
export class Action_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_1_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}

// Action 2
export class Action_2 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_2_1]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}

// Action 2.1
export class Action_2_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_after,
      loggerStatus: StatusEnum.default,
      actions: [Action_2_1_1]
    };
  }
}

// Action 2.1.1
export class Action_2_1_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_2_1_1_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}

// Action 3
export class Action_3 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_3_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.error,
      message: ActionsOrderEnum.action_3_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_4]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_3_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}

// Action 4
export class Action_4 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_4_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_4_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsOrderEnum.action_4_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}
