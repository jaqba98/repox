import { container, singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";
import { ParamDtoModel } from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters have max one command
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
export class MaxOneCommandValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildValidation: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
    const commands = paramDto.params
      .filter(param => param.paramType === ParamTypeEnum.command);
    if (!program && commands.length > 0) {
      return this.buildValidation.paramDtoValidationError(
        commands,
        ["You have specified the command without any program!"],
        [
          "You have to specify a program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    if (program && commands.length > 1) {
      return this.buildValidation.paramDtoValidationError(
        commands,
        ["You have specified too many commands!"],
        [
          "You have to specify one command for the given program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildValidation.paramDtoValidationSuccess(paramDto);
  }
}
