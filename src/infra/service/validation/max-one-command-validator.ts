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

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters have max one command
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
export class MaxOneCommandValidator
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParam: BuildParamDtoValidation
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(param => param.paramType === ParamType.program);
    const commands: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => param.paramType === ParamType.command);
    if (!program && commands.length > 0) {
      return this.buildParam.buildError(
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
      return this.buildParam.buildError(
        commands,
        ["You have specified too many commands!"],
        [
          "You have to specify one command for the given program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParam.buildSuccess(paramDto);
  }
}
