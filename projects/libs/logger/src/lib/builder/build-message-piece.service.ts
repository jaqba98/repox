import {
  EMPTY_STRING,
  NEW_LINE,
  SPACE
} from "@lib/core";
import {
  TEXT_RESET,
  TEXT_BRIGHT,
  TEXT_UNDERSCORE
} from "../const/text-style.const";

export const buildEmptyMessage = () => EMPTY_STRING;

export const buildNewLine = (quantity: number) =>
  NEW_LINE.repeat(quantity);

export const buildLine = (content: string) =>
  buildEmptyMessage()
    .concat(TEXT_RESET)
    .concat(content)
    .concat(TEXT_RESET);

export const buildLogo = (bgColor: string, logo: string) =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(bgColor)
    .concat(SPACE)
    .concat(logo)
    .concat(SPACE);

export const buildHeader = (bgColor: string, header: string) =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(bgColor)
    .concat(SPACE)
    .concat(header)
    .concat(SPACE);

export const buildWord = (fgColor: string, word: string) =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(fgColor)
    .concat(word);

export const buildUnderscoreWord = (fgColor: string, word: string) =>
  buildEmptyMessage()
    .concat(TEXT_BRIGHT)
    .concat(fgColor)
    .concat(TEXT_UNDERSCORE)
    .concat(word);
