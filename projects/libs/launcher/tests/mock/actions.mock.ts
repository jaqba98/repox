import { container } from "tsyringe";
import { StatusEnum } from "@lib/core";
import {
  ActionModel,
  ActionResultModel
} from "../../src/lib/model/action.model";
import { BuildSimpleMessageService } from "@lib/logger";

const build = container.resolve(BuildSimpleMessageService);

export const ActionsInput = {
  a_1_before: "Action 1 before",
  a_1_logic: "Action 1 logic",
  a_1_after: "Action 1 after",
  a_2_before: "Action 2 before",
  a_2_logic: "Action 2 logic",
  a_2_after: "Action 2 after",
  a_2_1_before: "Action 2.1 before",
  a_2_1_logic: "Action 2.1 logic",
  a_2_1_after: "Action 2.1 after",
  a_2_1_1_before: "Action 2.1.1 before",
  a_2_1_1_logic: "Action 2.1.1 logic",
  a_2_1_1_after: "Action 2.1.1 after",
  a_3_before: "Action 3 before",
  a_3_logic: "Action 3 logic",
  a_3_after: "Action 3 after",
  a_4_before: "Action 4 before",
  a_4_logic: "Action 4 logic",
  a_4_after: "Action 4 after"
};

export const actionsOutput = {
  a_1_before: build.buildDefault(ActionsInput.a_1_before),
  a_1_logic: build.buildDefault(ActionsInput.a_1_logic),
  a_1_after: build.buildDefault(ActionsInput.a_1_after),
  a_2_before: build.buildDefault(ActionsInput.a_2_before),
  a_2_logic: build.buildDefault(ActionsInput.a_2_logic),
  a_2_after: build.buildDefault(ActionsInput.a_2_after),
  a_2_1_before: build.buildDefault(ActionsInput.a_2_1_before),
  a_2_1_logic: build.buildDefault(ActionsInput.a_2_1_logic),
  a_2_1_after: build.buildDefault(ActionsInput.a_2_1_after),
  a_2_1_1_before: build.buildDefault(ActionsInput.a_2_1_1_before),
  a_2_1_1_logic: build.buildDefault(ActionsInput.a_2_1_1_logic),
  a_2_1_1_after: build.buildDefault(ActionsInput.a_2_1_1_after),
  a_3_before: build.buildDefault(ActionsInput.a_3_before),
  a_3_logic: build.buildDefault(ActionsInput.a_3_logic),
  a_3_after: build.buildDefault(ActionsInput.a_3_after),
  a_4_before: build.buildDefault(ActionsInput.a_4_before),
  a_4_logic: build.buildDefault(ActionsInput.a_4_logic),
  a_4_after: build.buildDefault(ActionsInput.a_4_after)
};

// Action 1
export class Action_1 implements ActionModel {
  runBefore(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_1_after,
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
      message: ActionsInput.a_2_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_2_1]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_after,
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
      message: ActionsInput.a_2_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_1_after,
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
      message: ActionsInput.a_2_1_1_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_1_1_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_2_1_1_after,
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
      message: ActionsInput.a_3_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.error,
      message: ActionsInput.a_3_logic,
      loggerStatus: StatusEnum.default,
      actions: [Action_4]
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_3_after,
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
      message: ActionsInput.a_4_before,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runLogic(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_4_logic,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
  runAfter(): ActionResultModel {
    return {
      status: StatusEnum.success,
      message: ActionsInput.a_4_after,
      loggerStatus: StatusEnum.default,
      actions: []
    };
  }
}
