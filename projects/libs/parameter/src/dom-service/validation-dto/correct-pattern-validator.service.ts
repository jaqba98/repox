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
 * Check the given DTO parameters have correct pattern.
 */
export class CorrectPatternValidatorService implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(paramDto => !this.checkParamPattern(paramDto));
    if (wrongParamsDto.length === 0) {
      return this.buildParamDtoResult.buildSuccess(paramDto);
    }
    return this.buildParamDtoResult.buildError(
      wrongParamsDto,
      ["You have used incorrect parameter pattern!"],
      wrongParamsDto.map(wrongParam => this.getParamTip(wrongParam)),
      paramDto
    );
  }

  private checkParamPattern(paramDto: ParamDtoEntityModel): boolean {
    const { paramBaseValue, paramType, paramHasValue } = paramDto;
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
    return `Correct pattern for ${paramBaseValue} is: ${pattern}`;
  }
}
