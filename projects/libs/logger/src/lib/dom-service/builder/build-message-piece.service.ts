import {
  TEXT_BRIGHT,
  TEXT_RESET,
  TEXT_UNDERSCORE
} from "../../const/text-style.const";
import { EMPTY_STRING, LOGO, NEW_LINE, SPACE } from "@lib/const";

/**
 * The message builder which contains group of small builders
 * to build complete messages.
 */

export const buildEmptyMessage = (): string => EMPTY_STRING;

export const buildNewLine = (quantity: number): string =>
  NEW_LINE.repeat(quantity);

export const buildLine = (content: string): string =>
  buildEmptyMessage()
    .concat(TEXT_RESET)
    .concat(content)
    .concat(TEXT_RESET);

export const buildLogo = (bgColor: string): string =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(bgColor)
    .concat(SPACE)
    .concat(LOGO)
    .concat(SPACE);

export const buildHeader = (
  bgColor: string,
  headerContent: string
): string => buildEmptyMessage()
  .concat(TEXT_BRIGHT)
  .concat(bgColor)
  .concat(SPACE)
  .concat(headerContent.toUpperCase())
  .concat(SPACE);

export const buildCleanWord = (
  fgColor: string,
  word: string
): string => buildEmptyMessage()
  .concat(TEXT_BRIGHT)
  .concat(fgColor)
  .concat(word);

export const buildUnderscoreWord = (
  fgColor: string,
  word: string
): string => buildEmptyMessage()
  .concat(TEXT_BRIGHT)
  .concat(fgColor)
  .concat(TEXT_UNDERSCORE)
  .concat(word);
// todo: refactor
