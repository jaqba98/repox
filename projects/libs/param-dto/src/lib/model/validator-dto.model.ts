import {
  ParamDtoValidationModel
} from "./param-dto-validation.model";
import { ParamDtoModel } from "./param-dto.model";

/**
 * The model which is implemented for each parameter DTO validator.
 * It defines the implementation of it.
 */
export interface ValidatorDtoModel {
  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel;
}
