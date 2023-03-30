import {
  buildCommandDtoMsg,
  buildErrorMsg,
  buildManyErrMsg,
  buildManyTipMsg,
  newline
} from "./base-msg-builder.service";
import {
  ParamDtoValidationModel
} from "../../../model/param-dto/param-dto-validation.model";

/**
 * The message builder for all errors.
 */

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

export const msgCommandNotExecutedCorrectlyError = (): string =>
  buildErrorMsg("Command not executed correctly!");
