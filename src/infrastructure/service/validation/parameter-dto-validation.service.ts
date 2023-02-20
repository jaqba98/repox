import { singleton } from "tsyringe";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import {
  MustHaveOneCommandValidationService
} from "./must-have-one-command-validation.service";

@singleton()
/**
 * The service is responsible for validate the parameter dto model.
 */
export class ParameterDtoValidationService {
  constructor(
    private readonly mustHaveOneCommand: MustHaveOneCommandValidationService
  ) {
  }

  /**
   * 1) Command has to contain only allowed characters.
   * 2) Program has to be only one.
   * 3) Program has to be first.
   * 4) Program must not contain value.
   * 5) Command has to be only one.
   * 6) Command must not be first.
   * 7) Command must not contain value.
   * 8) Argument / Alias must not be first.
   * 9) Argument / Alias must have correct structure.
   * */
  validation(parameterDto: ParameterDtoModel): ParameterDtoValidationModel {
    /* Must have one command */
    const mustHaveOneCommand = this.mustHaveOneCommand.validation(parameterDto);
    if (mustHaveOneCommand.error) {
      return mustHaveOneCommand;
    }
    /* Success */
    return { error: false, wrongIndexes: [], errors: [], tips: [] };
  }
}
