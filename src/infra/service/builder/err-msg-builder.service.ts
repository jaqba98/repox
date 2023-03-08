// todo: refactor
import { F_BRIGHT_RED } from "../../const/shell.const";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import {
  errorMsg, errorsMsg,
  message,
  nl,
  parameter,
  reset,
  space, tipsMsg
} from "./base-msg-builder.service";

/**
 * The messages builder for all success.
 */
export const msgParamDtoValidationError = (
  paramDto: ParamDtoModel,
  verifyDto: ParamsDtoValidatorModel
): string => {
  const command = paramDto.params
    .map(param => parameter(
      param.baseValue,
      param.index,
      verifyDto.wrongIndexes
    ))
    .join(space());
  return errorMsg("Command not executed correctly!")
    .concat(nl())
    .concat(message(F_BRIGHT_RED, '> repox '))
    .concat(command)
    .concat(reset())
    .concat(nl(2))
    .concat(errorsMsg(verifyDto.errors))
    .concat(nl())
    .concat(tipsMsg(verifyDto.tips))
    .concat(reset());
}
