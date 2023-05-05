import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto-model";
import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto-model";
import {
  BuildParamDtoValidation
} from "../builder/validation/build-param-dto-validation";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation-model";
import { ParamType } from "../../enum/param-type";

/**
 * Check the given DTO parameters have max one program.
 */
@singleton()
export class MaxOneProgramValidator implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDto: BuildParamDtoValidation
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const programs: Array<ParamDtoEntityModel> = paramDto.params
      .filter(paramDto => paramDto.paramType === ParamType.program);
    if (programs.length > 1) {
      return this.buildParamDto.buildError(
        programs,
        ["You have specified too many programs!"],
        [
          "You have to specify max one program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParamDto.buildSuccess(paramDto);
  }
}
