import { container, singleton } from "tsyringe";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  OnlySupportedCharactersValidatorService
} from "./only-supported-characters-validator.service";
import {
  CorrectPatternValidatorService
} from "./correct-pattern-validator.service";
import {
  MaxOneProgramValidatorService
} from "./max-one-program-validator.service";
import {
  MaxOneCommandValidatorService
} from "./max-one-command-validator.service";
import {
  CorrectOrderValidatorService
} from "./correct-order-validator.service";
import { ValidatorDtoModel } from "../../model/validator-dto.model";
import { ParamDtoModel } from "../../model/param-dto.model";

@singleton()
/**
 * Run all validators to verify the parameter DTO model.
 *
 * Pattern:
 * > repox <program> <arguments> <program> <arguments>
 *
 * Validators:
 * 1.Verify that each part of the command contains only
 *   supported characters.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that the command contains max 1 program (0 or 1).
 * 4.Verify that the command contains max 1 command
 *   (0 or 1 if the program exist and 0 if the program not exist).
 * 5.Verify that each part of the command are in correct order.
 */
export class ParamDtoValidationService {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidation(paramDto: ParamDtoModel): ParamDtoValidationModel {
    for (const service of this.getValidators()) {
      const result = service.runValidator(paramDto);
      if (!result.success) return result;
    }
    return this.buildParamDtoResult.buildSuccess(paramDto);
  }

  private getValidators(): Array<ValidatorDtoModel> {
    return [
      OnlySupportedCharactersValidatorService,
      CorrectPatternValidatorService,
      MaxOneProgramValidatorService,
      MaxOneCommandValidatorService,
      CorrectOrderValidatorService
    ].map(service => container.resolve<ValidatorDtoModel>(service));
  }
}