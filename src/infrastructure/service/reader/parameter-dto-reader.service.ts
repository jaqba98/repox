import { singleton } from "tsyringe";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { ParameterDtoModel } from "../../model/parameter-dto.model";

@singleton()
/**
 * The service is responsible for reading the real parameters from
 * the command line and building the parameter data transport object.
 */
export class ParameterDtoReaderService {
  read(): ParameterDtoModel {
    return this.getAllParameters()
      .filter((_, index) => this.getProgramParameter(index))
      .map((baseParameter, index) => ({ baseParameter, index }))
      .map(parameter => ({
        ...parameter,
        type: this.getParameterType(
          parameter.baseParameter,
          parameter.index
        ),
        hasValue: this.getParameterHasValue(parameter.baseParameter)
      }))
      .map(parameter => ({
        ...parameter,
        name: this.getParameterName(
          parameter.baseParameter,
          parameter.hasValue,
          parameter.type
        ),
        value: this.getParameterValue(
          parameter.baseParameter,
          parameter.hasValue
        )
      }))
      .reduce<ParameterDtoModel>((acc, curr) => {
        acc.parameters = [...acc.parameters, curr];
        return acc;
      }, { parameters: [] });
  }

  private getAllParameters(): Array<string> {
    return process.argv;
  }

  private getProgramParameter(index: number): boolean {
    return index > 1;
  }

  private getParameterType(
    baseParameter: string,
    index: number
  ): ParameterTypeEnum {
    if (baseParameter.startsWith("--")) {
      return ParameterTypeEnum.argument;
    }
    if (baseParameter.startsWith("-")) {
      return ParameterTypeEnum.alias;
    }
    return index === 0 ?
      ParameterTypeEnum.program :
      ParameterTypeEnum.command;
  }

  private getParameterHasValue(baseParameter: string): boolean {
    return baseParameter.includes("=");
  }

  private getParameterName(
    baseParameter: string,
    hasValue: boolean,
    type: ParameterTypeEnum
  ): string {
    const name = hasValue ?
      baseParameter.split("=")[0] :
      baseParameter;
    if (type === ParameterTypeEnum.argument) {
      return name.replace("--", "");
    }
    if (type === ParameterTypeEnum.alias) {
      return name.replace("-", "");
    }
    return name;
  }

  private getParameterValue(
    baseParameter: string,
    hasValue: boolean
  ): string {
    const value = hasValue ? baseParameter.split("=")[1] : "";
    return this.clearValue(value);
  }

  private clearValue(value: string): string {
    return value.replace(/^(["'`])/, "").replace(/(["'`])$/, "");
  }
}
