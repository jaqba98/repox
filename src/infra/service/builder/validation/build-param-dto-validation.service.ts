import { injectable, singleton } from "tsyringe";
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
 * the param dto validation successes and errors.
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
    wrongParams: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>,
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    return {
      isError: true,
      wrongParamIndexes: wrongParams.map(param => param.paramIndex),
      errors,
      tips,
      paramDto
    };
  }
}
