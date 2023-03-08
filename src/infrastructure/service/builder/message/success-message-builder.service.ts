import { buildSuccessMsg } from "./base-message-builder.service";

/**
 * The message builder for all success.
 */

export const msgCommandExecutedCorrectlySuccess = (): string =>
  buildSuccessMsg("Command executed correctly!");
