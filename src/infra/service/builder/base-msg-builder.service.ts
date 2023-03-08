// todo: refactor
import { EOL } from "os";
import {
  B_BRIGHT_GREEN,
  B_BRIGHT_RED,
  B_BRIGHT_YELLOW,
  F_BRIGHT_GREEN,
  F_BRIGHT_RED,
  F_BRIGHT_YELLOW,
  RESET,
  UNDERSCORE
} from "../../const/shell.const";

/**
 * Base message builder which contains group of small builders
 * to build complete message.
 */

export const emptyString = (): string => "";
export const space = (): string => " ";
export const nl = (i: number = 1): string => EOL.repeat(i);
export const reset = (): string => RESET;
export const header = (color: string, header: string): string =>
  `${color} ${header} `;
export const message = (style: string, msg: string): string =>
  `${style}${msg}`;

export const successMsg = (msg: string): string => emptyString()
  .concat(header(B_BRIGHT_GREEN, "REPOX"))
  .concat(reset())
  .concat(space())
  .concat(header(B_BRIGHT_GREEN, "SUCCESS"))
  .concat(reset())
  .concat(space())
  .concat(message(F_BRIGHT_GREEN, msg))
  .concat(reset());

export const errorMsg = (msg: string): string => emptyString()
  .concat(header(B_BRIGHT_RED, "REPOX"))
  .concat(reset())
  .concat(space())
  .concat(header(B_BRIGHT_RED, "ERROR"))
  .concat(reset())
  .concat(space())
  .concat(message(F_BRIGHT_RED, msg))
  .concat(reset());

export const errMsg = (msg: string): string => emptyString()
  .concat(header(B_BRIGHT_RED, "ERR"))
  .concat(reset())
  .concat(space())
  .concat(message(F_BRIGHT_RED, msg))
  .concat(reset());

export const tipMsg = (msg: string): string => emptyString()
  .concat(header(B_BRIGHT_YELLOW, "TIP"))
  .concat(reset())
  .concat(space())
  .concat(message(F_BRIGHT_YELLOW, msg))
  .concat(reset());

export const redParam = (param: string): string => emptyString()
  .concat(message(F_BRIGHT_RED, param))
  .concat(reset());

export const redUnderscoreParam = (param: string): string =>
  emptyString()
    .concat(message(`${F_BRIGHT_RED}${UNDERSCORE}`, param))
    .concat(reset());

export const parameter = (
  baseValue: string,
  index: number,
  wrongIndexes: Array<number>
): string => {
  return wrongIndexes.includes(index) ?
    redUnderscoreParam(baseValue) :
    redParam(baseValue);
}

export const errorsMsg = (errors: Array<string>): string => errors
  .map(error => errMsg(error))
  .join(nl())
  .concat(reset());

export const tipsMsg = (tips: Array<string>): string => tips
  .map(tip => tipMsg(tip))
  .join(nl())
  .concat(reset());
