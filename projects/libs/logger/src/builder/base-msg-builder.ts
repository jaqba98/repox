import { TEXT_BRIGHT, TEXT_RESET } from "../const/text-style.const";
import { EOL } from "os";
import { LoggerModeEnum } from "../enum/logger-mode.enum";

/**
 * Base message builder which contains group of small builders
 * to build complete messages.
 */

export const nl: string = EOL;

// export const newline = (num: number = 1): string => EOL.repeat(num);

const space = (): string => " ";
const reset = (): string => TEXT_RESET;
const emptyString = (): string => "";

export const buildEmptyMessage = (): string => "";

export const buildLine = (msg: string): string => buildEmptyMessage()
  .concat(reset())
  .concat(msg)
  .concat(reset());

export const buildLogo = (bgColor: string, isLogo: boolean): string =>
  isLogo ?
    buildEmptyMessage()
      .concat(TEXT_BRIGHT)
      .concat(bgColor)
      .concat(space())
      .concat("REPOX")
      .concat(space()) :
    "";

export const buildHeader = (
  bgColor: string,
  mode: LoggerModeEnum,
  isHeader: boolean
): string => isHeader ? buildEmptyMessage()
  .concat(TEXT_BRIGHT)
  .concat(bgColor)
  .concat(space())
  .concat(mode.toUpperCase())
  .concat(space()) : "";

export const buildMessage = (fgColor: string, message: string): string =>
  `${TEXT_BRIGHT}${fgColor}${message}`;

// const headerSuccess = (header: string): string =>
//   baseHeader(BG_TEXT_GREEN, header);
// const headerError = (header: string): string =>
//   baseHeader(BG_TEXT_RED, header);
// const headerWarning = (header: string): string =>
//   baseHeader(BG_TEXT_YELLOW, header);
// const headerInfo = (header: string): string =>
//   baseHeader(BG_TEXT_CYAN, header);
//
// /** Messages */
// const baseMessage = (fgColor: string, message: string): string =>
//   `${TEXT_BRIGHT}${fgColor}${message}`;
// const messageSuccess = (message: string): string =>
//   baseMessage(FG_TEXT_GREEN, message);
// const messageError = (message: string): string =>
//   baseMessage(FG_TEXT_RED, message);
// const messageWarning = (message: string): string =>
//   baseMessage(FG_TEXT_YELLOW, message);
// const messageInfo = (message: string): string =>
//   baseMessage(FG_TEXT_CYAN, message);
//
// /** Params */
// const redParam = (param: string): string => `${FG_TEXT_RED}${param}`;
// const redUnderscoreParam = (param: string): string =>
//   `${TEXT_UNDERSCORE}${redParam(param)}`;
//
// /** Lines */
// const buildLine = (line: string): string =>
//   `${reset()}${line}${reset()}`;
//
// /** Message parts */
// export const newline = (num: number = 1): string => EOL.repeat(num);
//
// export const buildSuccessMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerSuccess("REPOX")))
//     .concat(buildLine(space()))
//     .concat(buildLine(headerSuccess("SUCCESS")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageSuccess(message)));
//
// export const buildErrorMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerError("REPOX")))
//     .concat(buildLine(space()))
//     .concat(buildLine(headerError("ERROR")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageError(message)));
//
// export const buildRepoxInfoMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerInfo("REPOX")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageInfo(message)));
//
// export const buildErrMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerError("ERR")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageError(message)));
//
// export const buildTipMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerWarning("TIP")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageWarning(message)));
//
// export const buildInfoMsg = (message: string): string =>
//   emptyString()
//     .concat(buildLine(headerInfo("INF")))
//     .concat(buildLine(space()))
//     .concat(buildLine(messageInfo(message)));
//
// export const buildManyErrMsg = (messages: Array<string>): string =>
//   messages
//     .map(message => buildLine(buildErrMsg(message)))
//     .join(buildLine(newline()));
//
// export const buildManyTipMsg = (messages: Array<string>): string =>
//   messages
//     .map(message => buildLine(buildTipMsg(message)))
//     .join(buildLine(newline()));
//
// export const buildCommandDtoMsg = (
//   validationDto: ParamDtoValidationModel
// ): string => {
//   const { paramDto, wrongParamIndexes } = validationDto;
//   const params = paramDto.params
//     .filter(param =>
//       param.paramType !== ParamType.executor &&
//       param.paramType !== ParamType.application
//     )
//     .map(param => wrongParamIndexes.includes(param.paramIndex) ?
//       buildLine(redUnderscoreParam(param.paramBaseValue)) :
//       buildLine(redParam(param.paramBaseValue))
//     )
//     .join(buildLine(space()));
//   return emptyString()
//     .concat(buildLine(messageError("> repox ")))
//     .concat(buildLine(params));
// }
// todo: refactor
