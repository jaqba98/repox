import {
  buildErrMsg,
  buildInfoMsg
} from "./base-msg-builder.service";

/** The message builders for all info. */

export const msgInfInfo = (message: string): string =>
  buildInfoMsg(message);

export const msgCommandExecutedMessageInfo = (msg: string): string =>
  buildInfoMsg(msg);
