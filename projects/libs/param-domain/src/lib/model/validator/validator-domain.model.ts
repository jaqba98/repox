import { ParamDomainModel } from "../param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../param-domain/param-domain-validation.model";

/**
 * The model is implemented for each param domain validator.
 * It defines the implementation of it.
 */
export interface ValidatorDomainModel {
  runValidator(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel;
}
