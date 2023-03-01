import {
  buildSuccessMsg,
  buildEmptyString,
  buildSuccessHeader,
  buildReset,
  buildSpace,
  buildErrorHeader,
  buildErrorMsg,
  buildManyErrorMsg,
  buildManyTipsMsg, buildNewline
} from "./base-msg-builder.service";
import { ParamsDtoValidatorModel } from "../../model/param-dto.model";

/**
 * The messages builder for all success
 */

export const buildParamDtoValidationErrorMsg = (
  paramDto: Array<ParamsDtoValidatorModel>
): string => {
  const errors = paramDto.map(param => param.errors).flat();
  const tips = paramDto.map(param => param.tips).flat();
  return buildEmptyString()
    .concat(buildErrorHeader())
    .concat(buildSpace())
    .concat(buildErrorMsg('An error occurred'))
    .concat(buildNewline())
    .concat(buildNewline())
    .concat(buildManyErrorMsg(errors))
    .concat(buildNewline())
    .concat(buildNewline())
    .concat(buildManyTipsMsg(tips))
    .concat(buildReset())
}
