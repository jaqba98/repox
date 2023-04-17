import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The service is responsible for build
 * the param config validation successes and errors.
 */
export class BuildParamDomainValidationService {
  paramDomainValidationSuccess(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    return {
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain
    };
  }

  paramDomainValidationError(
    wrongParamIndexes: Array<number>,
    errors: Array<string>,
    tips: Array<string>,
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    return {
      isError: true,
      wrongParamIndexes,
      errors,
      tips,
      paramDomain
    };
  }
}
