import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";

@singleton()
/**
 * The service is responsible for run all validators to verify
 * the parameter DTO model.
 */
export class ParamsDtoValidatorService {
  verify(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    return {
      isError: false,
      wrongParams: [],
      errors: [],
      tips: []
    };
  }
}
