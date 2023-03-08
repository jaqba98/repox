// todo: refactor
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
 * the given dto parameters contain only supported signs.
 */
export class SupportedSignsService implements RunValidatorModel {
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
        errors: ["You have added not supported signs!"],
        tips
      };
  }

  private verifyParam(
    param: ParamDtoEntityModel
  ): { param: ParamDtoEntityModel, success: boolean } {
    switch (param.paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return { param, success: this.verifyCommand(param) };
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return { param, success: this.verifyArgument(param) };
      default:
        throw new Error(
          `Not supported parameter type: ${param.paramType}!`
        );
    }
  }

  private verifyCommand(param: ParamDtoEntityModel): boolean {
    return /^[a-zA-Z0-9-]+$/gm.test(param.baseValue);
  }

  private verifyArgument(param: ParamDtoEntityModel): boolean {
    return /^[a-zA-Z0-9-="'`,]+$/gm.test(param.baseValue);
  }

  private getParamTip(param: ParamDtoEntityModel): string {
    const { baseValue } = param;
    switch (param.paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return `Supported signs for ${baseValue} are: [a-z] [A-Z] [0-9] [-]`;
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return `Supported signs for ${baseValue} are: [a-z] [A-Z] [0-9] [-] [=] ["] ['] [\`] [,]`;
      default:
        throw new Error(
          `Not supported parameter type: ${param.paramType}!`
        );
    }
  }
}
