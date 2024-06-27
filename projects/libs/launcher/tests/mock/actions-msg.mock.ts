import { container } from "tsyringe";

import { EMPTY_STRING, StatusEnum } from "@lib/core";
import { BuildSimpleMessageService, DEFAULT_HEADER } from "@lib/logger";

const buildSimpleMessage = container.resolve(BuildSimpleMessageService);

const buildMessage = (message: string): string => buildSimpleMessage
  .build(EMPTY_STRING, DEFAULT_HEADER, message, StatusEnum.default);

export const actionsInputMsg = {
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
}

export const actionsOutputMsg = {
  action_1_before: buildMessage(actionsInputMsg.action_1_before),
  action_1_logic: buildMessage(actionsInputMsg.action_1_logic),
  action_1_after: buildMessage(actionsInputMsg.action_1_after),
  action_2_before: buildMessage(actionsInputMsg.action_2_before),
  action_2_logic: buildMessage(actionsInputMsg.action_2_logic),
  action_2_after: buildMessage(actionsInputMsg.action_2_after),
  action_2_1_before: buildMessage(actionsInputMsg.action_2_1_before),
  action_2_1_logic: buildMessage(actionsInputMsg.action_2_1_logic),
  action_2_1_after: buildMessage(actionsInputMsg.action_2_1_after),
  action_2_1_1_before: buildMessage(actionsInputMsg.action_2_1_1_before),
  action_2_1_1_logic: buildMessage(actionsInputMsg.action_2_1_1_logic),
  action_2_1_1_after: buildMessage(actionsInputMsg.action_2_1_1_after),
  action_3_before: buildMessage(actionsInputMsg.action_3_before),
  action_3_logic: buildMessage(actionsInputMsg.action_3_logic),
  action_3_after: buildMessage(actionsInputMsg.action_3_after),
  action_4_before: buildMessage(actionsInputMsg.action_4_before),
  action_4_logic: buildMessage(actionsInputMsg.action_4_logic),
  action_4_after: buildMessage(actionsInputMsg.action_4_after)
}
