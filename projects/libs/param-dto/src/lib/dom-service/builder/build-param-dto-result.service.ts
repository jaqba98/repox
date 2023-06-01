import { singleton } from "tsyringe";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto.model";

@singleton()
/**
 * Build the result of param DTO validation
 * for successes and errors.
 */
export class BuildParamDtoResultService {
  buildSuccess(paramDto: ParamDtoModel): ParamDtoValidationModel {
    return {
      success: true,
      wrongParamIndexes: [],
      baseValues: paramDto.params.map(param => param.paramBaseValue),
      errors: [],
      tips: [],
      model: paramDto
    };
  }

  buildError(
    wrongParamsDto: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>,
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    return {
      success: false,
      wrongParamIndexes: wrongParamsDto.map(item => item.paramIndex),
      baseValues: paramDto.params.map(param => param.paramBaseValue),
      errors,
      tips,
      model: paramDto
    };
  }
}
// todo: refactor