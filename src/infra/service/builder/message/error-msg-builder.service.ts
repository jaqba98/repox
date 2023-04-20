import {
  ParamDtoValidationModel
} from "../../../model/param-dto/param-dto-validation.model";
import {
  buildCommandDtoMsg, buildErrMsg,
  buildErrorMsg,
  buildManyErrMsg,
  buildManyTipMsg,
  newline
} from "./base-msg-builder.service";

/** The message builders for all errors. */

export const msgErrError = (message: string): string =>
  buildErrMsg(message);

export const msgCommandExecutedNotCorrectlyError = (): string =>
  buildErrorMsg("Command not executed correctly!");

export const msgParamDtoValidationError = (
  validationDto: ParamDtoValidationModel
): string => {
  return buildErrorMsg("Command not executed correctly!")
    .concat(newline())
    .concat(buildCommandDtoMsg(validationDto))
    .concat(newline(2))
    .concat(buildManyErrMsg(validationDto.errors))
    .concat(newline())
    .concat(buildManyTipMsg(validationDto.tips));
}
