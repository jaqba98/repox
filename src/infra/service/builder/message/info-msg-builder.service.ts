import {
  buildInfoMsg,
  buildRepoxInfoMsg, newline
} from "./base-msg-builder.service";

/** The message builders for all info. */

export const msgRunCommandInfo = (command: string): string =>
  buildRepoxInfoMsg(`Running the ${command} process`);
// todo: refactor this