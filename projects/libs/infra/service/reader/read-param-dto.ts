import { singleton } from "tsyringe";
import { ReadProcessArgv } from "./read-process-argv";
import { ParamDtoModel } from "../../model/param-dto/param-dto-model";
import { ParamType } from "../../enum/param-type";

/**
 * Reading the real parameters from the command line
 * and building the parameter DTO model.
 */
@singleton()
export class ReadParamDto {
  constructor(private readonly readProcessArgv: ReadProcessArgv) {
  }

  readParamDto(): ParamDtoModel {
    return {
      params: this.readProcessArgv.getArgv()
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

  private getParamType(arg: string, index: number): ParamType {
    if (arg.startsWith("--")) return ParamType.argument;
    if (arg.startsWith("-")) return ParamType.alias;
    if (index === 0) return ParamType.executor;
    if (index === 1) return ParamType.application;
    if (index === 2) return ParamType.program;
    return ParamType.command;
  }

  private getParamName(
    paramBaseValue: string,
    paramType: ParamType,
    paramHasValue: boolean
  ): string {
    const paramName: string = paramHasValue ?
      paramBaseValue.split("=")[0] :
      paramBaseValue;
    if (paramType === ParamType.argument) {
      return paramName.replace("--", "");
    }
    if (paramType === ParamType.alias) {
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
