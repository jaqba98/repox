import { buildSuccessMsg } from "./base-msg-builder";

/**
 * The message builders for all success.
 */

export const msgCommandExecutedCorrectlySuccess = (): string =>
  buildSuccessMsg("Command executed correctly!");
