// todo: refactor
import { singleton } from "tsyringe";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import { ParamDtoModel } from "../../model/param-dto.model";

@singleton()
/**
 * The service is responsible for reading the real parameters
 * from the command line and building the parameter DTO model.
 */
export class ReadParamDtoService {
  read(): ParamDtoModel {
    return process.argv
      .filter((_, index) => index > 1)
      .map((baseValue, index) => ({
        baseValue,
        index
      }))
      .map(param => ({
        ...param,
        paramType: this.getParamType(
          param.baseValue,
          param.index
        ),
        hasValue: this.getParamHasValue(param.baseValue)
      }))
      .map(param => ({
        ...param,
        paramName: this.getParamName(
          param.baseValue,
          param.hasValue,
          param.paramType
        ),
        paramValues: this.getParamValues(
          param.baseValue,
          param.hasValue
        )
      }))
      .reduce<ParamDtoModel>((acc, curr) => ({
        params: [...acc.params, curr]
      }), { params: [] });
  }

  private getParamType(
    baseValue: string,
    index: number
  ): ParamTypeEnum {
    if (baseValue.startsWith("--"))
      return ParamTypeEnum.argument;
    if (baseValue.startsWith("-"))
      return ParamTypeEnum.alias;
    return index === 0 ?
      ParamTypeEnum.program :
      ParamTypeEnum.command;
  }

  private getParamHasValue(baseValue: string): boolean {
    return baseValue.includes("=");
  }

  private getParamName(
    baseValue: string,
    hasValue: boolean,
    paramType: ParamTypeEnum
  ): string {
    const paramName = hasValue ?
      baseValue.split("=")[0] :
      baseValue;
    return paramType === ParamTypeEnum.argument ?
      paramName.replace("--", "") :
      paramType === ParamTypeEnum.alias ?
        paramName.replace("-", "") :
        baseValue;
  }

  private getParamValues(
    baseValue: string,
    hasValue: boolean
  ): Array<string> {
    if (!hasValue) return [];
    return baseValue
      .split("=")[1]
      .replace(/\s/g, "")
      .replace(/^(["'`])/, "")
      .replace(/(["'`])$/, "")
      .split(",");
  }
}
