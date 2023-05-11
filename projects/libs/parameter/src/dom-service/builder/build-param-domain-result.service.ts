import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * Build the result of param domain validation-domain-dto
 * for successes and errors.
 */
export class BuildParamDomainResultService {
  buildSuccess(
    paramDomain: ParamDomainModel,
    baseValues: Array<string>
  ): ParamDomainValidationModel {
    return {
      success: true,
      wrongParamIndexes: [],
      baseValues,
      errors: [],
      tips: [],
      paramDomain
    };
  }

  buildError(
    wrongParamIndexes: Array<number>,
    errors: Array<string>,
    tips: Array<string>,
    paramDomain: ParamDomainModel,
    baseValues: Array<string>
  ): ParamDomainValidationModel {
    return {
      success: false,
      wrongParamIndexes,
      baseValues,
      errors,
      tips,
      paramDomain
    };
  }
}
