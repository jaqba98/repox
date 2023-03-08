import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters contain only supported signs.
 */
export class SupportedSignsValidatorService
  implements ValidatorDtoModel {
  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParams = paramDto.params
      .filter(param => this.verifyParam(param));
    if (wrongParams.length === 0) {
      return {
        isError: false,
        wrongParamIndexes: [],
        errors: [],
        tips: [],
        paramDto
      }
    }
    const tips = wrongParams.map(param => this.getParamTip(param));
    return {
      isError: true,
      wrongParamIndexes: wrongParams.map(param => param.paramIndex),
      errors: ["You have added not supported signs!"],
      tips,
      paramDto
    }
  }

  private verifyParam(
    param: ParamDtoEntityModel
  ): boolean {
    switch (param.paramType) {
      case ParamTypeEnum.executor:
      case ParamTypeEnum.application:
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return /^[a-zA-Z0-9-]+$/gm.test(param.paramBaseValue);
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return /^[a-zA-Z0-9-="'`,]+$/gm.test(param.paramBaseValue);
      default:
        throw new Error(`Not supported parameter type!`);
    }
  }

  private getParamTip(param: ParamDtoEntityModel): string {
    const { paramBaseValue } = param;
    switch (param.paramType) {
      case ParamTypeEnum.program:
      case ParamTypeEnum.command:
        return `Supported signs for ${paramBaseValue} are: [a-z] [A-Z] [0-9] [-]`;
      case ParamTypeEnum.argument:
      case ParamTypeEnum.alias:
        return `Supported signs for ${paramBaseValue} are: [a-z] [A-Z] [0-9] [-] [=] ["] ['] [\`] [,]`;
      default:
        throw new Error(`Not supported parameter type!`);
    }
  }
}

// todo: refactor