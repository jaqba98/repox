import { container, injectable, singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import { ParamDtoModel } from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters have max one program.
 */
export class MaxOneProgramValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoValidation = container.resolve(BuildParamDtoValidationService)
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const programs = paramDto.params
      .filter(param => param.paramType === ParamTypeEnum.program);
    if (programs.length <= 1) {
      return this.buildParamDtoValidation.paramDtoValidationSuccess(paramDto);
    }
    return this.buildParamDtoValidation.paramDtoValidationError(
      programs,
      ["You have specified too many programs!"],
      [
        "You have to specify max one program.",
        "Pattern: repox <program> <arguments> <command> <arguments>"
      ],
      paramDto
    );
  }
}
