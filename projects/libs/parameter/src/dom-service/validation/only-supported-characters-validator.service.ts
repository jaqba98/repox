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
 * Check the given DTO parameters contain only supported characters.
 */
export class OnlySupportedCharactersValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(paramDto => !this.checkParamCharacters(paramDto));
    if (wrongParamsDto.length === 0) {
      return this.buildParamDtoResult.buildSuccess(paramDto);
    }
    return this.buildParamDtoResult.buildError(
      wrongParamsDto,
      ["You have added not supported characters!"],
      wrongParamsDto.map(wrongParam => this.getParamTip(wrongParam)),
      paramDto
    );
  }

  private checkParamCharacters(
    paramDto: ParamDtoEntityModel
  ): boolean {
    const { paramBaseValue, paramType } = paramDto;
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

  private getParamTip(paramDto: ParamDtoEntityModel): string {
    const { paramBaseValue, paramType } = paramDto;
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
