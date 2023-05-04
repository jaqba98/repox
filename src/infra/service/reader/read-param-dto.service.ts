import { singleton } from "tsyringe";
import { ReadProcessArgvService } from "./read-process-argv.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto-model";
import { ParamType } from "../../enum/param-type";

type TProcessArgvToDTO =
  Pick<ParamDtoEntityModel, "paramBaseValue" | "paramIndex">;
type TParamType =
  Pick<ParamDtoEntityModel, keyof TProcessArgvToDTO | "paramType">;
type TParamHasValue =
  Pick<ParamDtoEntityModel, keyof TParamType | "paramHasValue">;
type TParamName =
  Pick<ParamDtoEntityModel, keyof TParamHasValue | "paramName">;
type TParamValues =
  Pick<ParamDtoEntityModel, keyof TParamName | "paramValues">;

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
        return this.getProcessArgvToDTO(value, index);
      })
      .map(param => this.getParamType(param))
      .map(param => this.getParamHasValue(param))
      .map(param => this.getParamName(param))
      .map(param => this.getParamValues(param))
      .map(param => this.getParamHasManyValues(param))
      .reduce<ParamDtoModel>((acc, curr) => {
        return this.buildParamDto(acc, curr);
      }, { params: [] });
  }

  private getProcessArgvToDTO(
    value: string,
    index: number
  ): TProcessArgvToDTO {
    return { paramBaseValue: value, paramIndex: index };
  }

  private getParamType(param: TProcessArgvToDTO): TParamType {
    if (param.paramBaseValue.startsWith("--"))
      return { ...param, paramType: ParamType.argument };
    if (param.paramBaseValue.startsWith("-"))
      return { ...param, paramType: ParamType.alias };
    if (param.paramIndex === 0)
      return { ...param, paramType: ParamType.executor };
    if (param.paramIndex === 1)
      return { ...param, paramType: ParamType.application };
    if (param.paramIndex === 2)
      return { ...param, paramType: ParamType.program };
    return { ...param, paramType: ParamType.command };
  }

  private getParamHasValue(param: TParamType): TParamHasValue {
    const paramHasValue: boolean = param.paramBaseValue.includes("=");
    return { ...param, paramHasValue };
  }

  private getParamName(param: TParamHasValue): TParamName {
    const paramName: string = param.paramHasValue ?
      param.paramBaseValue.split("=")[0] :
      param.paramBaseValue;
    if (param.paramType === ParamType.argument) {
      return { ...param, paramName: paramName.replace("--", "") };
    } else if (param.paramType === ParamType.alias) {
      return { ...param, paramName: paramName.replace("-", "") };
    } else {
      return { ...param, paramName };
    }
  }

  private getParamValues(param: TParamName): TParamValues {
    if (param.paramHasValue) {
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
    return { ...param, paramValues: [] };
  }

  private getParamHasManyValues(
    param: TParamValues
  ): ParamDtoEntityModel {
    return {
      ...param,
      paramHasManyValues: param.paramValues.length > 1
    };
  }

  private buildParamDto(
    acc: ParamDtoModel,
    curr: ParamDtoEntityModel
  ): ParamDtoModel {
    return {
      params: [...acc.params, curr]
    };
  }
}
