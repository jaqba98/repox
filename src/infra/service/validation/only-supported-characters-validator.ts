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

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters contain only supported characters.
 */
export class OnlySupportedCharactersValidator
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParam: BuildParamDtoValidation
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => !this.checkParamCharacters(param));
    if (wrongParamsDto.length === 0) {
      return this.buildParam.buildSuccess(paramDto);
    }
    return this.buildParam.buildError(
      wrongParamsDto,
      ["You have added not supported characters!"],
      wrongParamsDto.map(param => this.getParamTip(param)),
      paramDto
    );
  }

  private checkParamCharacters(param: ParamDtoEntityModel): boolean {
    const { paramType, paramBaseValue } = param;
    switch (paramType) {
      case ParamType.executor:
      case ParamType.application:
        return true;
      case ParamType.program:
      case ParamType.command:
        return this.checkProgramAndCommand(paramBaseValue);
      case ParamType.argument:
      case ParamType.alias:
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
      case ParamType.program:
      case ParamType.command:
        return this.buildSupportedCharactersMessage(
          paramBaseValue,
          "[a-z] [A-Z] [0-9] [-]"
        );
      case ParamType.argument:
      case ParamType.alias:
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
