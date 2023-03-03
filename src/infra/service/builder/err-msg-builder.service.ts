import {
  buildEmptyString,
  buildErrorHeader,
  buildErrorMsg,
  buildManyErrorMsg,
  buildManyTipsMsg,
  buildNewline,
  buildReset,
  buildSpace
} from "./base-msg-builder.service";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { F_RED, RESET, UNDERSCORE } from "../../const/shell.const";

/**
 * The messages builder for all success
 */
// todo: refactor the builder
export const buildParamDtoValidationErrorMsg = (
  paramDto: ParamDtoModel,
  verifyDto: Array<ParamsDtoValidatorModel>
): string => {
  const command = paramDto.params
    .map(param => {
      if (verifyDto[0].wrongIndexes.includes(param.index)) {
        return `${UNDERSCORE}${param.baseValue}${RESET}${F_RED}`
      } else {
        return param.baseValue;
      }
    })
    .join(" ");
  const errors = verifyDto.map(dto => dto.errors).flat();
  const tips = verifyDto.map(dto => dto.tips).flat();
  return buildEmptyString()
    .concat(buildErrorHeader())
    .concat(buildSpace())
    .concat(buildErrorMsg('An error occurred'))
    .concat(buildNewline())
    .concat(buildNewline())
    .concat(buildErrorMsg(`> repox ${command}`))
    .concat(buildNewline())
    .concat(buildNewline())
    .concat(buildManyErrorMsg(errors))
    .concat(buildNewline())
    .concat(buildNewline())
    .concat(buildManyTipsMsg(tips))
    .concat(buildReset());
}
