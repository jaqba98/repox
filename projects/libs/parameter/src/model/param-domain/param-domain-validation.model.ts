import { ParamDomainModel } from "./param-domain.model";

/**
 * The result model of the parameter domain validation.
 */
export interface ParamDomainValidationModel {
  success: boolean;
  wrongParamIndexes: Array<number>;
  baseValues: Array<string>;
  errors: Array<string>;
  tips: Array<string>;
  paramDomain: ParamDomainModel;
}
