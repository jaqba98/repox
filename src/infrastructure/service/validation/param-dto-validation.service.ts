import { container, singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import {
  CorrectPatternValidatorService
} from "../validator/correct-pattern-validator.service";
import {
  MaxOneProgramValidatorService
} from "../validator/max-one-program-validator.service";
import { ParamDtoModel } from "../../model/param-dto/param-dto.model";
import {
  OnlySupportedCharactersValidatorService
} from "../validator/only-supported-characters-validator.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";
import {
  MaxOneCommandValidatorService
} from "../validator/max-one-command-validator.service";
import {
  CorrectOrderValidatorService
} from "../validator/correct-order-validator.service";

@singleton()
/**
 * The service is responsible for run all validators
 * to verify the parameter DTO model.
 *
 * repox <program> <arguments> <command> <arguments>
 *
 * Validators:
 * 1.Verify that each part of the command contains only
 *   supported characters.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that the command contains max 1 program (0 or 1).
 * 4.Verify that the command contains max 1 command
 * (0 or 1 if the program exist and 0 if the program not exist).
 * 5.Verify that each part of the command are in correct order.
 */
export class ParamDtoValidationService {
  constructor(
    private readonly buildValidation: BuildParamDtoValidationService
  ) {
  }

  runValidation(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const error = this.getAllValidators()
      .map(validator => validator.runValidator(paramDto))
      .find(result => result.isError);
    return error ?
      error :
      this.buildValidation.paramDtoValidationSuccess(paramDto);
  }

  private getAllValidators(): Array<ValidatorDtoModel> {
    return [
      OnlySupportedCharactersValidatorService,
      CorrectPatternValidatorService,
      MaxOneProgramValidatorService,
      MaxOneCommandValidatorService,
      CorrectOrderValidatorService
    ].map(validator =>
      container.resolve<ValidatorDtoModel>(validator)
    );
  }
}
