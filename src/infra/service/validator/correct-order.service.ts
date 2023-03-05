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
    // todo: create implementation of this validator
    return { isError: false, wrongIndexes: [], errors: [], tips: [] };
  }
}
