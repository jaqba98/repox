import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../../model/param-dto/param-dto-validation.model";

@singleton()
/**
 * The service is responsible for build
 * the param dto validation for successes and errors.
 */
export class BuildParamDtoValidationService {
  paramDtoValidationSuccess(
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    return {
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDto
    };
  }

  paramDtoValidationError(
    wrongParamDto: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>,
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    return {
      isError: true,
      wrongParamIndexes: wrongParamDto.map(param => param.paramIndex),
      errors,
      tips,
      paramDto
    };
  }
}
