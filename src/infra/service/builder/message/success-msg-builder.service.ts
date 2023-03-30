import { buildSuccessMsg } from "./base-msg-builder.service";

/**
 * The message builder for all success.
 */

export const msgCommandExecutedCorrectlySuccess = (): string =>
  buildSuccessMsg("Command executed correctly!");

export const msgExecCommandSuccess = (command: string): string =>
  buildSuccessMsg(command);
