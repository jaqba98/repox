import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * Build the result of param domain validation
 * for successes and errors.
 */
export class BuildParamDomainResultService {
  buildSuccess(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    return {
      success: true,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain
    };
  }

  buildError(
    wrongParamIndexes: Array<number>,
    errors: Array<string>,
    tips: Array<string>,
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    return {
      success: false,
      wrongParamIndexes,
      errors,
      tips,
      paramDomain
    };
  }
}
