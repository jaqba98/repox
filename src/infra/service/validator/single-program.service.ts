import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { RunValidatorModel } from "../../model/run-validator.model";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters have only one program.
 */
export class SingleProgramService implements RunValidatorModel {
  run(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    return { isError: false, wrongIndexes: [], errors: [], tips: [] };
  }
}
