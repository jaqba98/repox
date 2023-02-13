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
        type: this.getType(parameter.baseParameter, parameter.index),
        hasValue: this.getHasValue(parameter.baseParameter)
      }))
      .map(parameter => ({
        ...parameter,
        name: this.getName(
          parameter.baseParameter,
          parameter.hasValue,
          parameter.type
        ),
        value: this.getValue(
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

  private getType(
    baseValue: string,
    index: number
  ): ParameterTypeEnum {
    if (baseValue.startsWith("--")) {
      return ParameterTypeEnum.argument;
    }
    if (baseValue.startsWith("-")) {
      return ParameterTypeEnum.alias;
    }
    return index === 0 ?
      ParameterTypeEnum.program :
      ParameterTypeEnum.command;
  }

  private getHasValue(baseValue: string): boolean {
    return baseValue.includes("=");
  }

  private getName(
    baseValue: string,
    hasValue: boolean,
    type: ParameterTypeEnum
  ): string {
    const name = hasValue ? baseValue.split("=")[0] : baseValue;
    if (type === ParameterTypeEnum.argument) {
      return name.replace("--", "");
    }
    if (type === ParameterTypeEnum.alias) {
      return name.replace("-", "");
    }
    return name;
  }

  private getValue(baseValue: string, hasValue: boolean): string {
    const value = hasValue ? baseValue.split("=")[1] : "";
    return this.clearValue(value);
  }

  private clearValue(value: string): string {
    return value.replace(/^(["'`])/, "").replace(/(["'`])$/, "");
  }
}
