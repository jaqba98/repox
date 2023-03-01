import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { RunValidatorModel } from "../../model/run-validator.model";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters are in correct order.
 */
export class CorrectOrderService implements RunValidatorModel {
  run(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    return { isError: false, params: [], errors: [], tips: [] };
  }
}
