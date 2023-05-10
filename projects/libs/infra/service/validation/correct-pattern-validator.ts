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
 * Check the given DTO parameters have correct pattern.
 */
@singleton()
export class CorrectPatternValidator implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDto: BuildParamDtoValidation
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(paramDto => !this.checkParamPattern(paramDto));
    if (wrongParamsDto.length === 0) {
      return this.buildParamDto.buildSuccess(paramDto);
    }
    return this.buildParamDto.buildError(
      wrongParamsDto,
      ["You have used incorrect parameter pattern!"],
      wrongParamsDto.map(wrongParam => this.getParamTip(wrongParam)),
      paramDto
    );
  }

  private checkParamPattern(paramDto: ParamDtoEntityModel): boolean {
    const { paramBaseValue, paramType, paramHasValue } = paramDto;
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

  private getParamTip(paramDto: ParamDtoEntityModel): string {
    const { paramType, paramBaseValue } = paramDto;
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
    return `Correct pattern for ${paramBaseValue} is: ${pattern}`;
  }
}
