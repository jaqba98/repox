import { ParamDomainModel } from "../param-domain/param-domain-model";
import {
  ParamDependencyCommandModel,
  ParamDependencyModel
} from "../param-domain/param-dependency-model";
import {
  ParamDomainValidationModel
} from "../param-domain/param-domain-validation-model";

/**
 * The model which is implemented for each param config validator.
 * It defines the implementation of it.
 */
export interface ValidatorDomainModel {
  runValidator(
    paramDomain: ParamDomainModel,
    paramDep: ParamDependencyModel,
    commandDep: ParamDependencyCommandModel
  ): ParamDomainValidationModel;
}
