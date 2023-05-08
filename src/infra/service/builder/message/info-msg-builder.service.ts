import { buildRepoxInfoMsg } from "./base-msg-builder";

/**
 * The message builders for all info.
 * @param command
 */

export const msgRunCommandInfo = (command: string): string =>
  buildRepoxInfoMsg(`Running the ${command} process`);
