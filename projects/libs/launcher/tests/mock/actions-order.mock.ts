import { container } from "tsyringe";
import { StatusEnum } from "@lib/core";
import {
  ActionModel,
  ActionResultModel
} from "../../src/lib/model/action.model";
import { BuildSimpleMessageService } from "@lib/logger";

const buildSimpleMessage = container
  .resolve(BuildSimpleMessageService);

export const actionsOrderInput = {
  action_1_before: "Action 1 before",
  action_1_logic: "Action 1 logic",
  action_1_after: "Action 1 after",
  action_2_before: "Action 2 before",
  action_2_logic: "Action 2 logic",
  action_2_after: "Action 2 after",
  action_2_1_before: "Action 2.1 before",
  action_2_1_logic: "Action 2.1 logic",
  action_2_1_after: "Action 2.1 after",
  action_2_1_1_before: "Action 2.1.1 before",
  action_2_1_1_logic: "Action 2.1.1 logic",
  action_2_1_1_after: "Action 2.1.1 after",
  action_3_before: "Action 3 before",
  action_3_logic: "Action 3 logic",
  action_3_after: "Action 3 after",
  action_4_before: "Action 4 before",
  action_4_logic: "Action 4 logic",
  action_4_after: "Action 4 after"
};

export const actionsOrderOutput = {
  action_1_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_1_before),
  action_1_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_1_logic),
  action_1_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_1_after),
  action_2_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_before),
  action_2_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_logic),
  action_2_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_after),
  action_2_1_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_before),
  action_2_1_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_logic),
  action_2_1_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_after),
  action_2_1_1_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_1_before),
  action_2_1_1_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_1_logic),
  action_2_1_1_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_2_1_1_after),
  action_3_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_3_before),
  action_3_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_3_logic),
  action_3_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_3_after),
  action_4_before: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_4_before),
  action_4_logic: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_4_logic),
  action_4_after: buildSimpleMessage
    .buildDefault(actionsOrderInput.action_4_after)
};

// Action 1
export class Action_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_1_after,
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
      message: actionsOrderInput.action_2_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_2_1]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_after,
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
      message: actionsOrderInput.action_2_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_1_after,
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
      message: actionsOrderInput.action_2_1_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_1_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_2_1_1_after,
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
      message: actionsOrderInput.action_3_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.error,
      message: actionsOrderInput.action_3_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_4]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_3_after,
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
      message: actionsOrderInput.action_4_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_4_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: actionsOrderInput.action_4_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}
