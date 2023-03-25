import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import { GetProcessArgvService } from "./get-process-argv.service";

@singleton()
/**
 * The service is responsible for reading the real parameters
 * from the command line and building the parameter DTO model.
 */
export class ReadParamDtoService {
  constructor(
    private readonly getProcessArgv: GetProcessArgvService
  ) {
  }
  read(): ParamDtoModel {
    return this.getProcessArgv.getArgv()
      .map((value: string, index: number) =>
        this.argToDto(value, index)
      )
      .map(param => this.getParamType(param))
      .map(param => this.getParamHasValue(param))
      .map(param => this.getParamName(param))
      .map(param => this.getParamValues(param))
      .reduce<ParamDtoModel>((acc, curr) =>
        this.buildParamDto(acc, curr), { params: [] }
      );
  }

  private argToDto(
    value: string, index: number
  ): Pick<ParamDtoEntityModel, "paramBaseValue" | "paramIndex"> {
    return { paramBaseValue: value, paramIndex: index };
  }

  private getParamType(
    param: Pick<ParamDtoEntityModel, "paramBaseValue" | "paramIndex">
  ): Omit<ParamDtoEntityModel,
    "paramHasValue" |
    "paramName" |
    "paramValues"
  > {
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
    param: Omit<ParamDtoEntityModel,
      "paramHasValue" |
      "paramName" |
      "paramValues"
    >
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
    return {
      ...param,
      paramName: param.paramType === ParamTypeEnum.argument ?
        paramName.replace("--", "") :
        param.paramType === ParamTypeEnum.alias ?
          paramName.replace("-", "") :
          paramName
    };
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
