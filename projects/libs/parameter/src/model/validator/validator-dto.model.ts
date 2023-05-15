import { ParamDtoModel } from "../param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../param-dto/param-dto-validation.model";

/**
 * The model which is implemented for each parameter DTO validator.
 * It defines the implementation of it.
 */
export interface ValidatorDtoModel {
  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel;
}
// todo: refactor