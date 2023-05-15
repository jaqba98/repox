import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * Check the given DTO parameters have max one program
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
export class MaxOneCommandValidatorService implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
    const commands: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => param.paramType === ParamTypeEnum.command);
    if (!program && commands.length > 0) {
      return this.buildParamDtoResult.buildError(
        commands,
        ["You have specified the program without any program!"],
        [
          "You have to specify a program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ],
        paramDto
      );
    }
    if (program && commands.length > 1) {
      return this.buildParamDtoResult.buildError(
        commands,
        ["You have specified too many commands!"],
        [
          "You have to specify one program for the given program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParamDtoResult.buildSuccess(paramDto);
  }
}
// todo: refactor