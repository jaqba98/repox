import { ParamDomainModel } from "./param-domain.model";

/**
 * The result model of the parameter domain validation-domain-dto.
 */
export interface ParamDomainValidationModel {
  success: boolean;
  wrongParamIndexes: Array<number>;
  errors: Array<string>;
  tips: Array<string>;
  paramDomain: ParamDomainModel;
}
// todo: refactor