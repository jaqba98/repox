import { container, singleton } from "tsyringe";
import {
  BuildParamDtoValidation
} from "../builder/validation/build-param-dto-validation";
import { ParamDtoModel } from "../../model/param-dto/param-dto-model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation-model";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto-model";
import {
  OnlySupportedCharactersValidator
} from "./only-supported-characters-validator";
import { CorrectPatternValidator } from "./correct-pattern-validator";
import { MaxOneProgramValidator } from "./max-one-program-validator";
import { MaxOneCommandValidator } from "./max-one-command-validator";
import { CorrectOrderValidator } from "./correct-order-validator";

/**
 * Run all validators to verify the parameter DTO model.
 *
 * Pattern:
 * > repox <command> <arguments> <command> <arguments>
 *
 * Validators:
 * 1.Verify that each part of the command contains only
 *   supported characters.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that the command contains max 1 command (0 or 1).
 * 4.Verify that the command contains max 1 command
 *   (0 or 1 if the command exist and 0 if the command not exist).
 * 5.Verify that each part of the command are in correct order.
 */
@singleton()
export class ParamDtoValidation {
  constructor(
    private readonly buildParamDto: BuildParamDtoValidation
  ) {
  }

  runValidation(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const paramDtoError: ParamDtoValidationModel | undefined = [
      OnlySupportedCharactersValidator,
      CorrectPatternValidator,
      MaxOneProgramValidator,
      MaxOneCommandValidator,
      CorrectOrderValidator
    ]
      .map(service => container.resolve<ValidatorDtoModel>(service))
      .map(service => service.runValidator(paramDto))
      .find(result => !result.success);
    return paramDtoError || this.buildParamDto.buildSuccess(paramDto);
  }
}
