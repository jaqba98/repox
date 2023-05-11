import {
  TEXT_RESET,
  TEXT_UNDERSCORE
} from "../../const/text-style.const";
import { emptyString, space } from "../../const/symbol.const";

/**
 * Message builder which contains group of small builders
 * to build complete messages.
 */

const reset = (): string => TEXT_RESET;

export const buildEmptyMessage = (): string => emptyString;

export const buildLine = (content: string): string =>
  buildEmptyMessage()
    .concat(reset())
    .concat(content)
    .concat(reset());

export const buildLogo = (bgColor: string): string =>
  buildEmptyMessage()
    .concat(bgColor)
    .concat(space)
    .concat("REPOX")
    .concat(space);

export const buildHeader = (
  bgColor: string,
  headerContent: string
): string => buildEmptyMessage()
  .concat(bgColor)
  .concat(space)
  .concat(headerContent.toUpperCase())
  .concat(space);

export const buildMessage = (
  fgColor: string,
  message: string
): string => buildEmptyMessage()
  .concat(fgColor)
  .concat(message);

export const buildWord = (
  fgColor: string,
  word: string,
  underscore: boolean
): string => {
  return buildEmptyMessage()
    .concat(fgColor)
    .concat(underscore ? TEXT_UNDERSCORE : emptyString)
    .concat(word)
};
