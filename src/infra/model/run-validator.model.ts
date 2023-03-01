import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "./param-dto.model";

/**
 * The model which is implemented for each validator. It defines
 * the implementation of each validator.
 */
export interface RunValidatorModel {
  run(paramsDto: ParamDtoModel): ParamsDtoValidatorModel;
}
