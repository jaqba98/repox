import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The service is responsible for verify
 * the parameter domain model.
 */
export class ParamDomainValidatorService {
  runValidation(
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
}
