import { ParamDomainModel } from "../param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../param-domain/param-domain-validation.model";
import {
  ParamDependencyCommandModel,
  ParamDependencyModel
} from "../param-domain/param-dependency.model";

/**
 * The model which is implemented for each param domain validator.
 * It defines the implementation of it.
 */
export interface ValidatorDomainModel {
  runValidator(
    paramDomain: ParamDomainModel,
    program: ParamDependencyModel | undefined,
    command: ParamDependencyCommandModel | undefined
  ): ParamDomainValidationModel;
}
