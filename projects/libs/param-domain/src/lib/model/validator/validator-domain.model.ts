import {
  ParamDomainValidationModel
} from "../param-domain/param-domain-validation.model";
import { BaseGetParamDependencyModel } from "@lib/model";

/**
 * The model which is implemented for each parameter domain validator.
 * It defines the implementation of it.
 */
export interface ValidatorDomainModel {
  runValidator(
    getParamDependency: BaseGetParamDependencyModel
  ): ParamDomainValidationModel;
}
