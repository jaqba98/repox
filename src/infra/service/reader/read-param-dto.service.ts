import { singleton } from "tsyringe";
import { ReadProcessArgvService } from "./read-process-argv.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * The service is responsible for reading the real parameters
 * from the command line and building the parameter DTO model.
 */
export class ReadParamDtoService {
  constructor(
    private readonly readProcessArgv: ReadProcessArgvService
  ) {
  }

  read(): ParamDtoModel {
    return this.readProcessArgv.getArgv()
      .map((value: string, index: number) => {
        return this.processArgvToDTO(value, index);
      })
      .map(param => this.getParamType(param))
      .map(param => this.getParamHasValue(param))
      .map(param => this.getParamName(param))
      .map(param => this.getParamValues(param))
      .reduce<ParamDtoModel>((acc, curr) => {
        return this.buildParamDto(acc, curr);
      }, { params: [] });
  }

  private processArgvToDTO(
    value: string, index: number
  ): Pick<ParamDtoEntityModel, "paramBaseValue" | "paramIndex"> {
    return { paramBaseValue: value, paramIndex: index };
  }

  private getParamType(
    param: Pick<ParamDtoEntityModel, "paramBaseValue" | "paramIndex">
  ): Omit<ParamDtoEntityModel, "paramHasValue" | "paramName" |
    "paramValues"> {
    if (param.paramBaseValue.startsWith("--"))
      return { ...param, paramType: ParamTypeEnum.argument };
    if (param.paramBaseValue.startsWith("-"))
      return { ...param, paramType: ParamTypeEnum.alias };
    if (param.paramIndex === 0)
      return { ...param, paramType: ParamTypeEnum.executor };
    if (param.paramIndex === 1)
      return { ...param, paramType: ParamTypeEnum.application };
    if (param.paramIndex === 2)
      return { ...param, paramType: ParamTypeEnum.program };
    return { ...param, paramType: ParamTypeEnum.command };
  }

  private getParamHasValue(
    param: Omit<ParamDtoEntityModel, "paramHasValue" | "paramName" |
      "paramValues">
  ): Omit<ParamDtoEntityModel, "paramName" | "paramValues"> {
    return {
      ...param,
      paramHasValue: param.paramBaseValue.includes("=")
    };
  }

  private getParamName(
    param: Omit<ParamDtoEntityModel, "paramName" | "paramValues">
  ): Omit<ParamDtoEntityModel, "paramValues"> {
    const paramName: string = param.paramHasValue ?
      param.paramBaseValue.split("=")[0] :
      param.paramBaseValue;
    if (param.paramType === ParamTypeEnum.argument) {
      return { ...param, paramName: paramName.replace("--", "") };
    } else if (param.paramType === ParamTypeEnum.alias) {
      return { ...param, paramName: paramName.replace("-", "") };
    } else {
      return { ...param, paramName };
    }
  }

  private getParamValues(
    param: Omit<ParamDtoEntityModel, "paramValues">
  ): ParamDtoEntityModel {
    if (!param.paramHasValue) return { ...param, paramValues: [] };
    return {
      ...param,
      paramValues: param.paramBaseValue
        .split("=")[1]
        .replace(/\s/g, "")
        .replace(/^(["'`])/, "")
        .replace(/(["'`])$/, "")
        .split(",")
    };
  }

  private buildParamDto(
    acc: ParamDtoModel,
    curr: ParamDtoEntityModel
  ): ParamDtoModel {
    return { params: [...acc.params, curr] };
  }
}
// todo: fix it