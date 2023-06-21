import { singleton } from "tsyringe";
import { ParamDtoModel } from "../../model/param-dto.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import {
  ALIAS_PREFIX,
  ARGUMENT_PREFIX,
  EQUAL_SIGN,
  VALUE_SEPARATION
} from "../../const/param-dto.const";
import {
  ParamDtoStoreService
} from "../store/param-dto-store.service";

@singleton()
/**
 * Build the parameter DTO model
 * from the command line parameters.
 */
export class BuildParamDtoService {
  constructor(private readonly paramDtoStore: ParamDtoStoreService) {
  }

  buildParamDto(argv: Array<string>): void {
    const paramDto: ParamDtoModel = {
      params: argv
        .map((arg: string, index: number) => ({
          paramBaseValue: arg,
          paramIndex: index,
          paramType: this.getParamType(arg, index),
          paramHasValue: arg.includes(EQUAL_SIGN)
        }))
        .map(param => ({
          ...param,
          paramName: this.getParamName(
            param.paramBaseValue,
            param.paramHasValue,
            param.paramType
          ),
          paramValues: this.getParamValues(
            param.paramBaseValue,
            param.paramHasValue
          )
        }))
        .map(param => ({
          ...param,
          paramHasManyValues: param.paramValues.length > 1
        }))
    };
    this.paramDtoStore.setParamDto(paramDto);
  }

  private getParamType(arg: string, index: number): ParamTypeEnum {
    if (arg.startsWith(ARGUMENT_PREFIX)) {
      return ParamTypeEnum.argument;
    }
    if (arg.startsWith(ALIAS_PREFIX)) return ParamTypeEnum.alias;
    if (index === 0) return ParamTypeEnum.executor;
    if (index === 1) return ParamTypeEnum.application;
    if (index === 2) return ParamTypeEnum.program;
    return ParamTypeEnum.command;
  }

  private getParamName(
    paramBaseValue: string,
    paramHasValue: boolean,
    paramType: ParamTypeEnum
  ): string {
    const paramName: string = paramHasValue ?
      paramBaseValue.split(EQUAL_SIGN)[0] :
      paramBaseValue;
    if (paramType === ParamTypeEnum.argument) {
      return paramName.replace(ARGUMENT_PREFIX, "");
    }
    if (paramType === ParamTypeEnum.alias) {
      return paramName.replace(ALIAS_PREFIX, "");
    }
    return paramName;
  }

  private getParamValues(
    paramBaseValue: string,
    paramHasValue: boolean
  ): Array<string> {
    if (!paramHasValue) return [];
    return paramBaseValue
      .split(EQUAL_SIGN)[1]
      .replace(/\s/g, "")
      .replace(/^(["'`])/, "")
      .replace(/(["'`])$/, "")
      .split(VALUE_SEPARATION);
  }
}
// todo: refactor
