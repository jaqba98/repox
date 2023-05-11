import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../parameter/src/model/param-domain/param-domain-validation.model";

/**
 * Build the response of param domain validation
 * for successes and errors.
 */
@singleton()
export class BuildParamDomainValidation {
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
