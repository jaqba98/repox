import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto-model";
import {
  BuildParamDtoValidation
} from "../builder/validation/build-param-dto-validation";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto-model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation-model";
import { ParamType } from "../../enum/param-type";

/**
 * Check the given DTO parameters have max one command
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
@singleton()
export class MaxOneCommandValidator implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDto: BuildParamDtoValidation
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(paramDto => paramDto.paramType === ParamType.program);
    const commands: Array<ParamDtoEntityModel> = paramDto.params
      .filter(paramDto => paramDto.paramType === ParamType.command);
    if (!program && commands.length > 0) {
      return this.buildParamDto.buildError(
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
      return this.buildParamDto.buildError(
        commands,
        ["You have specified too many commands!"],
        [
          "You have to specify one command for the given program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParamDto.buildSuccess(paramDto);
  }
}
