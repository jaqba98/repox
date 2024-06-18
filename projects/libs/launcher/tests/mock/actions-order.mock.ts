import { LoggerModeEnum } from "@lib/logger";

import { ActionStatusEnum } from "../../src/lib/enum/action.enum";
import {
  ActionModel,
  ActionResultModel
} from "../../src/lib/model/action.model";
import { ActionsOrderEnum } from "../enum/actions-order.enum";

// Action 1
export class Action_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_1_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_1_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_1_after,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
}

// Action 2
export class Action_2 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: [Action_2_1]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_after,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
}

// Action 2.1
export class Action_2_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_after,
      loggerMode: LoggerModeEnum.plain,
      actions: [Action_2_1_1]
    };
  }
}

// Action 2.1.1
export class Action_2_1_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_1_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_1_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_2_1_1_after,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
}

// Action 3
export class Action_3 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_3_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.failed,
      message: ActionsOrderEnum.action_3_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: [Action_4]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_3_after,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
}

// Action 4
export class Action_4 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_4_before,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_4_logic,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: ActionStatusEnum.completed,
      message: ActionsOrderEnum.action_4_after,
      loggerMode: LoggerModeEnum.plain,
      actions: []
    };
  }
}
