import { ParamDomainModel } from "./param-domain.model";

/** The result model of the parameter config validation. */
export interface ParamDomainValidationModel {
  isError: boolean;
  wrongParamIndexes: Array<number>;
  errors: Array<string>;
  tips: Array<string>;
  paramDomain: ParamDomainModel;
}
