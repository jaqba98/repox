import {
  BG_GREEN,
  BG_RED,
  BG_YELLOW,
  FG_GREEN,
  FG_RED,
  FG_WHITE,
  FG_YELLOW
} from "../../../const/color.const";
import { BRIGHT, RESET, UNDERSCORE } from "../../../const/text.const";
import { EOL } from "os";
import {
  ParamDtoValidationModel
} from "../../../model/param-dto/param-dto-validation.model";

/**
 * Base message builder which contains group of small builders
 * to build complete message.
 */

/** Basics */
const space = (): string => "\s";
const reset = (): string => RESET;
const emptyString = (): string => "";

/** Headers */
const baseHeader = (bgColor: string, header: string): string =>
  `${BRIGHT}${bgColor}${FG_WHITE}${space()}${header}${space()}`;
const headerSuccess = (header: string): string =>
  baseHeader(BG_GREEN, header);
const headerError = (header: string): string =>
  baseHeader(BG_RED, header);
const headerWarning = (header: string): string =>
  baseHeader(BG_YELLOW, header);

/** Messages */
const baseMessage = (fgColor: string, message: string): string =>
  `${BRIGHT}${fgColor}${message}`;
const messageSuccess = (message: string): string =>
  baseMessage(FG_GREEN, message);
const messageError = (message: string): string =>
  baseMessage(FG_RED, message);
const messageWarning = (message: string): string =>
  baseMessage(FG_YELLOW, message);

/** Params */
const redParam = (param: string): string => `${FG_RED}${param}`;
const redUnderscoreParam = (param: string): string =>
  `${UNDERSCORE}${redParam(param)}`;

/** Lines */
const buildLine = (line: string): string =>
  `${reset()}${line}${reset()}`;

/** Message parts */
export const newline = (num: number = 1): string => EOL.repeat(num);

export const buildSuccessMsg = (message: string): string =>
  emptyString()
    .concat(buildLine(headerSuccess("REPOX")))
    .concat(buildLine(space()))
    .concat(buildLine(headerSuccess("SUCCESS")))
    .concat(buildLine(space()))
    .concat(buildLine(messageSuccess(message)));

export const buildErrorMsg = (message: string): string =>
  emptyString()
    .concat(buildLine(headerError("REPOX")))
    .concat(buildLine(space()))
    .concat(buildLine(headerError("ERROR")))
    .concat(buildLine(space()))
    .concat(buildLine(messageError(message)));

export const buildErrMsg = (message: string): string =>
  emptyString()
    .concat(buildLine(headerError("ERR")))
    .concat(buildLine(space()))
    .concat(buildLine(messageError(message)));

export const buildTipMsg = (message: string): string =>
  emptyString()
    .concat(buildLine(headerWarning("TIP")))
    .concat(buildLine(space()))
    .concat(buildLine(messageWarning(message)));

export const buildManyErrMsg = (messages: Array<string>): string =>
  messages
    .map(message => buildLine(buildErrMsg(message)))
    .join(buildLine(newline()));

export const buildManyTipMsg = (messages: Array<string>): string =>
  messages
    .map(message => buildLine(buildTipMsg(message)))
    .join(buildLine(newline()));

export const buildCommandMsg = (
  validationDto: ParamDtoValidationModel
): string => {
  const { paramDto, wrongParamIndexes } = validationDto;
  const params = paramDto.params
    .map(param => wrongParamIndexes.includes(param.paramIndex) ?
      buildLine(redUnderscoreParam(param.paramBaseValue)) :
      buildLine(redParam(param.paramBaseValue))
    )
    .join(buildLine(space()));
  return emptyString()
    .concat(buildLine(messageError("> repox ")))
    .concat(buildLine(params));
}
