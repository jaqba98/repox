import { singleton } from "tsyringe";
import { ParamDtoModel } from "../../model/param-dto.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * Building the parameter DTO model from the
 * real parameters from the command line.
 */
export class BuildParamDtoService {
  readParamDto(argv: Array<string>): ParamDtoModel {
    return {
      params: argv
        .map((arg: string, index: number) => ({
          paramBaseValue: arg,
          paramIndex: index,
          paramType: this.getParamType(arg, index),
          paramHasValue: arg.includes("=")
        }))
        .map(param => ({
          ...param,
          paramName: this.getParamName(
            param.paramBaseValue,
            param.paramType,
            param.paramHasValue
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
  }

  private getParamType(arg: string, index: number): ParamTypeEnum {
    if (arg.startsWith("--")) return ParamTypeEnum.argument;
    if (arg.startsWith("-")) return ParamTypeEnum.alias;
    if (index === 0) return ParamTypeEnum.executor;
    if (index === 1) return ParamTypeEnum.application;
    if (index === 2) return ParamTypeEnum.program;
    return ParamTypeEnum.command;
  }

  private getParamName(
    paramBaseValue: string,
    paramType: ParamTypeEnum,
    paramHasValue: boolean
  ): string {
    const paramName: string = paramHasValue ?
      paramBaseValue.split("=")[0] :
      paramBaseValue;
    if (paramType === ParamTypeEnum.argument) {
      return paramName.replace("--", "");
    }
    if (paramType === ParamTypeEnum.alias) {
      return paramName.replace("-", "");
    }
    return paramName;
  }

  private getParamValues(
    paramBaseValue: string,
    paramHasValue: boolean
  ): Array<string> {
    if (!paramHasValue) return [];
    return paramBaseValue
      .split("=")[1]
      .replace(/\s/g, "")
      .replace(/^(["'`])/, "")
      .replace(/(["'`])$/, "")
      .split(",");
  }
}
// todo: refactor