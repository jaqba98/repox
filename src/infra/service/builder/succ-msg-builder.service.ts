// todo: refactor
import { successMsg } from "./base-msg-builder.service";

/**
 * The messages builder for all success
 */

export const msgCommandExecutedCorrectlySuccess = (): string =>
  successMsg("Command executed correctly!");
