import { buildInfoMsg } from "./base-msg-builder.service";

/** The message builders for all info. */

export const msgCommandExecutedMessageInfo = (msg: string): string =>
  buildInfoMsg(msg);
