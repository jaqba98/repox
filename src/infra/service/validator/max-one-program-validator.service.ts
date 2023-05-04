import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto-model";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";
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
 * the given DTO parameters have max one program.
 */
export class MaxOneProgramValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParam: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const programs: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => param.paramType === ParamType.program);
    if (programs.length > 1) {
      return this.buildParam.paramDtoValidationError(
        programs,
        ["You have specified too many programs!"],
        [
          "You have to specify max one program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParam.paramDtoValidationSuccess(paramDto);
  }
}
