import { singleton } from "tsyringe";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";

@singleton()
/**
 * The service is responsible for validate the parameter dto model.
 */
export class ParameterDtoValidationService {
  validation(parameterDto: ParameterDtoModel): ParameterDtoValidationModel {
    return {
      wrongIndexes: [],
      errors: [],
      tips: []
    }
  }
}
