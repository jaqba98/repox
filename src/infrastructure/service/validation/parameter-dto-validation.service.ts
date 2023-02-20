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
