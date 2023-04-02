import { buildSuccessMsg } from "./base-msg-builder.service";

/** The message builders for all success. */

export const msgCommandExecutedCorrectlySuccess = (): string =>
  buildSuccessMsg("Command executed correctly!");
