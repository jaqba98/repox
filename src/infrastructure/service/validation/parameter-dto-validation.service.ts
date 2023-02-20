import { singleton } from "tsyringe";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import {
  MustHasOneCommandValidationService
} from "./must-has-one-command-validation.service";

@singleton()
/**
 * The service is responsible for validate the parameter dto model.
 */
export class ParameterDtoValidationService {
  constructor(
    private readonly mustHasOneCommand: MustHasOneCommandValidationService
  ) {
  }

  validation(parameterDto: ParameterDtoModel): ParameterDtoValidationModel {
    const mustHasOneCommand = this.mustHasOneCommand.validation(parameterDto);
    if (mustHasOneCommand.error) {
      return mustHasOneCommand;
    }
    return { error: true, wrongIndexes: [], errors: [], tips: [] }
  }
}
