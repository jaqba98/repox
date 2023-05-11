import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";

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
      errors: [],
      tips: [],
      paramDto
    };
  }

  buildError(
    wrongParamsDto: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>,
    paramDto: ParamDtoModel
  ): ParamDtoValidationModel {
    const wrongParamIndexes: Array<number> = wrongParamsDto
      .map(wrongParamDto => wrongParamDto.paramIndex);
    return {
      success: false,
      wrongParamIndexes,
      errors,
      tips,
      paramDto
    };
  }
}
