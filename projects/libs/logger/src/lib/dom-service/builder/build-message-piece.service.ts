import { EMPTY_STRING, NEW_LINE, SPACE } from "@lib/const";
import {
  TEXT_BRIGHT,
  TEXT_RESET,
  TEXT_UNDERSCORE
} from "../../const/text-style.const";

/**
 * The piece message builder which contains group of small builders
 * to build complete message.
 */

export const buildEmptyMessage = (): string => EMPTY_STRING;

export const buildNewLine = (quantity: number): string =>
  NEW_LINE.repeat(quantity);

export const buildLine = (content: string): string =>
  buildEmptyMessage()
    .concat(TEXT_RESET)
    .concat(content)
    .concat(TEXT_RESET);

export const buildLogo = (bgColor: string, logo: string): string =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(bgColor)
    .concat(SPACE)
    .concat(logo)
    .concat(SPACE);

export const buildHeader = (
  bgColor: string,
  header: string
): string =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(bgColor)
    .concat(SPACE)
    .concat(header)
    .concat(SPACE);

export const buildWord = (
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
