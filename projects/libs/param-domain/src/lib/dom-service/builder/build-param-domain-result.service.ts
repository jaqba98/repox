import { singleton } from "tsyringe";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * Build result of the param domain validation
 * for success and error.
 */
export class BuildParamDomainResultService {
  buildSuccess(): ParamDomainValidationModel {
    return {
      success: true,
      wrongIndexes: [],
      errors: [],
      tips: []
    };
  }

  buildError(
    wrongIndexes: Array<number>,
    errors: Array<string>,
    tips: Array<string>
  ): ParamDomainValidationModel {
    return {
      success: false,
      wrongIndexes,
      errors,
      tips
    };
  }
}
