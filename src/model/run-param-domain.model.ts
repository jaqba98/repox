import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "./param-domain.model";

/**
 * The model which is implemented for each validator. It defines
 * the implementation of each validator.
 */
export interface RunParamDomainModel {
  run(paramsDto: ParamDomainModel): ParamsDomainValidatorModel;
}
