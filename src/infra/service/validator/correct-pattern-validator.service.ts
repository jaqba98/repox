import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamType } from "../../enum/param-type";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters have correct pattern.
 */
export class CorrectPatternValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParam: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => !this.checkParamPattern(param));
    if (wrongParamsDto.length === 0) {
      return this.buildParam.paramDtoValidationSuccess(paramDto);
    }
    return this.buildParam.paramDtoValidationError(
      wrongParamsDto,
      ["You have added incorrect parameter pattern!"],
      wrongParamsDto.map(param => this.getParamTip(param)),
      paramDto
    );
  }

  private checkParamPattern(param: ParamDtoEntityModel): boolean {
    const { paramHasValue, paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamType.executor:
      case ParamType.application:
        return true;
      case ParamType.program:
      case ParamType.command:
        return this.checkProgramAndCommand(paramBaseValue);
      case ParamType.argument:
        return this.checkArgument(paramHasValue, paramBaseValue);
      case ParamType.alias:
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
    baseValue: string
  ): boolean {
    return paramHasValue ?
      /^--[a-zA-Z0-9-]+=[a-zA-Z0-9-"'/`,\s]+$/gm.test(baseValue) :
      /^--[a-zA-Z0-9-/]+$/gm.test(baseValue);
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
      case ParamType.program:
      case ParamType.command:
        return this.buildCorrectPatternMessage(
          paramBaseValue,
          "<name>"
        );
      case ParamType.argument:
        return this.buildCorrectPatternMessage(
          paramBaseValue,
          "--<name> or --<name>=<value>"
        );
      case ParamType.alias:
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
