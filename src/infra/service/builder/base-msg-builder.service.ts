import {
  B_BRIGHT_GREEN, B_BRIGHT_RED, B_BRIGHT_YELLOW,
  F_BRIGHT_GREEN, F_BRIGHT_RED, F_BRIGHT_YELLOW,
  RESET
} from "../../const/shell.const";
import { EOL } from "os";

/**
 * Base message builder which contains group of small builders
 * to build complete message.
 */

export const buildSuccessHeader = (): string =>
  `${B_BRIGHT_GREEN} REPOX ${RESET}`;

export const buildErrorHeader = (): string =>
  `${B_BRIGHT_RED} REPOX ${RESET}`;

export const buildErrHeader = (): string =>
  `${B_BRIGHT_RED} ERR ${RESET}`;

export const buildTipHeader = (): string =>
  `${B_BRIGHT_YELLOW} TIP ${RESET}`;

export const buildSpace = (): string => " ";

export const buildEmptyString = (): string => "";

export const buildNewline = (): string => EOL;

export const buildSuccessMsg = (msg: string): string =>
  `${F_BRIGHT_GREEN}${msg}${RESET}`;

export const buildErrorMsg = (msg: string): string =>
  `${F_BRIGHT_RED}${msg}${RESET}`;

export const buildTipMsg = (msg: string): string =>
  `${F_BRIGHT_YELLOW}${msg}${RESET}`;

export const buildReset = (): string => RESET;

export const buildManyErrorMsg = (errors: Array<string>): string =>
  errors
    .map(error => `${buildErrHeader()} ${buildErrorMsg(error)}`)
    .join(EOL);

export const buildManyTipsMsg = (tips: Array<string>): string => tips
  .map(tips => `${buildTipHeader()} ${buildTipMsg(tips)}`)
  .join(EOL);
