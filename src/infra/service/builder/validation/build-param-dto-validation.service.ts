import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../../model/param-dto/param-dto-model";
import {
  ParamDtoValidationModel
} from "../../../model/param-dto/param-dto-validation-model";

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
    wrongParamsDto: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>,
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    const wrongParamIndexes: Array<number> = wrongParamsDto
      .map(param => param.paramIndex);
    return {
      isError: true,
      wrongParamIndexes,
      errors,
      tips,
      paramDto
    };
  }
}
