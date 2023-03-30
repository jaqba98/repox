import { singleton } from "tsyringe";
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
 * the given DTO parameters have correct pattern.
 */
export class CorrectPatternValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildValidation: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const errors = paramDto.params
      .filter(param => !this.checkParamPattern(param));
    if (errors.length === 0) {
      return this.buildValidation.paramDtoValidationSuccess(paramDto);
    }
    const tips = errors.map(param => this.getParamTip(param));
    return this.buildValidation.paramDtoValidationError(
      errors,
      ["You have added incorrect parameter pattern!"],
      tips,
      paramDto
    );
  }

  private checkParamPattern(param: ParamDtoEntityModel): boolean {
    const { paramHasValue, paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamTypeEnum.executor:
      case ParamTypeEnum.application:
        return true;
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return this.checkProgramAndCommand(paramBaseValue);
      case ParamTypeEnum.argument:
        return this.checkArgument(paramHasValue, paramBaseValue);
      case ParamTypeEnum.alias:
        return this.checkAlias(paramHasValue, paramBaseValue);
      default:
        throw new Error(`Not supported parameter type: ${paramType}`);
    }
  }

  private checkProgramAndCommand(paramBaseValue: string): boolean {
    return /^.*$/gm.test(paramBaseValue);
  }

  private checkArgument(
    paramHasValue: boolean,
    paramBaseValue: string
  ): boolean {
    return paramHasValue ?
      /^--[a-zA-Z0-9-]+=[a-zA-Z0-9-"'/`,\s]+$/gm.test(paramBaseValue) :
      /^--[a-zA-Z0-9-/]+$/gm.test(paramBaseValue);
  }

  private checkAlias(
    paramHasValue: boolean,
    paramBaseValue: string
  ): boolean {
    return paramHasValue ?
      /^-[a-zA-Z0-9-]=[a-zA-Z0-9-"'`,\s]+$/gm.test(paramBaseValue) :
      /^-[a-zA-Z0-9-]$/gm.test(paramBaseValue);
  }

  private getParamTip(param: ParamDtoEntityModel): string {
    const { paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return this.buildCorrectPatternMessage(
          paramBaseValue,
          "<name>"
        );
      case ParamTypeEnum.argument:
        return this.buildCorrectPatternMessage(
          paramBaseValue,
          "--<name> or --<name>=<value>"
        );
      case ParamTypeEnum.alias:
        return this.buildCorrectPatternMessage(
          paramBaseValue,
          "-<sign> or -<sign>=<value>"
        );
      default:
        throw new Error(`Not supported parameter type: ${paramType}`);
    }
  }

  private buildCorrectPatternMessage(
    paramBaseValue: string,
    pattern: string
  ): string {
    return `Supported pattern for ${paramBaseValue} are: ${pattern}`;
  }
}
