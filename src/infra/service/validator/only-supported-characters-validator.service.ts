import { container, singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
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
 * the given DTO parameters contain only supported characters.
 */
export class OnlySupportedCharactersValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildValidation: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const errors = paramDto.params
      .filter(param => !this.checkParamCharacters(param));
    if (errors.length === 0) {
      return this.buildValidation.paramDtoValidationSuccess(paramDto);
    }
    const tips = errors.map(param => this.getParamTip(param));
    return this.buildValidation.paramDtoValidationError(
      errors,
      ["You have added not supported characters!"],
      tips,
      paramDto
    );
  }

  private checkParamCharacters(param: ParamDtoEntityModel): boolean {
    const { paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamTypeEnum.executor:
      case ParamTypeEnum.application:
        return true;
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return this.checkProgramAndCommand(paramBaseValue);
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return this.checkArgumentAndAlias(paramBaseValue);
      default:
        throw new Error(`Not supported parameter type: ${paramType}`);
    }
  }

  private checkProgramAndCommand(paramBaseValue: string): boolean {
    return /^[a-zA-Z0-9-]+$/gm.test(paramBaseValue);
  }

  private checkArgumentAndAlias(paramBaseValue: string): boolean {
    return /^[a-zA-Z0-9-="'`,\s]+$/gm.test(paramBaseValue);
  }

  private getParamTip(param: ParamDtoEntityModel): string {
    const { paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return this.buildSupportedCharactersMessage(
          paramBaseValue,
          "[a-z] [A-Z] [0-9] [-]"
        );
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return this.buildSupportedCharactersMessage(
          paramBaseValue,
          "[a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"
        );
      default:
        throw new Error(`Not supported parameter type: ${paramType}`);
    }
  }

  private buildSupportedCharactersMessage(
    paramBaseValue: string,
    chars: string
  ): string {
    return `Supported characters for ${paramBaseValue} are: ${chars}`;
  }
}
