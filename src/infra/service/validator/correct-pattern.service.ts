import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { RunValidatorModel } from "../../model/run-validator.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters have correct pattern.
 */
export class CorrectPatternService implements RunValidatorModel {
  run(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    const wrongParams = paramsDto.params
      .map(param => this.verifyParam(param))
      .filter(param => !param.success)
      .map(param => param.param);
    const tips = wrongParams.map(param => this.getParamTip(param));
    return wrongParams.length === 0 ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: wrongParams.map(param => param.index),
        errors: ["You have added incorrect parameter pattern!"],
        tips
      }
  }

  private verifyParam(
    param: ParamDtoEntityModel
  ): { param: ParamDtoEntityModel, success: boolean } {
    switch (param.paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return { param, success: this.verifyCommand(param) };
      case ParamTypeEnum.argument:
        return { param, success: this.verifyArgument(param) };
      case ParamTypeEnum.alias:
        return { param, success: this.verifyAlias(param) };
      default:
        throw new Error(
          `Not supported parameter type: ${param.paramType}!`
        );
    }
  }

  private verifyCommand(param: ParamDtoEntityModel): boolean {
    return /^.*$/gm.test(param.baseValue);
  }

  private verifyArgument(param: ParamDtoEntityModel): boolean {
    return param.hasValue ?
      /^--.*=.*$/gm.test(param.baseValue) :
      /^--.*$/gm.test(param.baseValue);
  }

  private verifyAlias(param: ParamDtoEntityModel): boolean {
    return param.hasValue ?
      /^-.=.*$/gm.test(param.baseValue) :
      /^-.$/gm.test(param.baseValue);
  }

  private getParamTip(param: ParamDtoEntityModel): string {
    const { baseValue } = param;
    switch (param.paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return `Supported pattern for ${baseValue} is: <name>`;
      case ParamTypeEnum.argument:
        return `Supported pattern for ${baseValue} is: --<name> or --<name>=<value>`;
      case ParamTypeEnum.alias:
        return `Supported pattern for ${baseValue} is: -<sign> or -<sign>=<value>`;
      default:
        throw new Error(
          `Not supported parameter type: ${param.paramType}!`
        );
    }
  }
}
