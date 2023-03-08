import { container, singleton } from "tsyringe";
import { CorrectPatternService } from "./correct-pattern.service";
import { SingleProgramService } from "./single-program.service";
import { ParamDtoModel } from "../../model/param-dto/param-dto.model";
import { SingleCommandService } from "./single-command.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import {
  SupportedSignsValidatorService
} from "./supported-signs-validator.service";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";

@singleton()
/**
 * The service is responsible for run all validators to verify
 * the parameter DTO model.
 *
 * repox <program> <arguments> <command> <arguments>
 *
 * Validators:
 * 1.Verify that each part of the command contains only supported
 *   signs.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that command contains max: 1 program.
 * 4.Verify that command contains max: 1 command if given a program.
 * 5.Verify that each part of the command are in correct order.
 */
export class ParamsDtoValidatorService {
  runValidators(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const error = this.getAllValidators()
      .map(validator => validator.runValidator(paramDto))
      .find(result => result.isError);
    return error ? error : {
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDto
    };
  }

  private getAllValidators(): Array<ValidatorDtoModel> {
    return [
      SupportedSignsValidatorService,
      CorrectPatternService,
      SingleProgramService,
      SingleCommandService
    ].map(validator => container.resolve(validator));
  }
}
