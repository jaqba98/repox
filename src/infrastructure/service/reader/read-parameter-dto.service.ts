import { singleton } from "tsyringe";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { ParameterDtoEntityModel, ParameterDtoModel } from "../../model/parameter-dto.model";

@singleton()
export class ReadParameterDtoService {
  private lastBelongingType: ParameterDtoEntityModel["belong"] = "myself";

  read(): ParameterDtoModel {
    return this.getAllParameters()
      .filter((_, index) => this.getProgramParameter(index))
      .map((baseValue, index) => ({ baseValue, index }))
      .map(parameter => ({
        ...parameter,
        type: this.getParameterType(parameter.baseValue, parameter.index)
      }))
      .map(parameter => ({
        ...parameter,
        belong: this.getParameterBelonging(parameter.type),
      }))
      .map(parameter => ({
        ...parameter,
        hasValue: this.parameterHasValue(parameter.baseValue),
      }))
      .map(parameter => ({
        ...parameter,
        name: this.getParameterName(parameter.baseValue, parameter.hasValue, parameter.type),
      }))
      .map(parameter => ({
        ...parameter,
        value: this.getParameterValue(parameter.baseValue, parameter.hasValue),
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

  private getParameterType(baseValue: string, index: number): ParameterTypeEnum {
    if (baseValue.startsWith("--")) return ParameterTypeEnum.argument;
    if (baseValue.startsWith("-")) return ParameterTypeEnum.alias;
    return index === 0 ? ParameterTypeEnum.program : ParameterTypeEnum.command;
  }

  private getParameterBelonging(type: ParameterTypeEnum): ParameterDtoEntityModel["belong"] {
    if (type === ParameterTypeEnum.program || type === ParameterTypeEnum.command) {
      this.lastBelongingType = type;
      return "myself";
    }
    return this.lastBelongingType;
  }

  private parameterHasValue(baseValue: string): boolean {
    return baseValue.includes("=");
  }

  private getParameterName(baseValue: string, hasValue: boolean, type: ParameterTypeEnum): string {
    const name = hasValue ? baseValue.split("=")[0] : baseValue;
    if (type === ParameterTypeEnum.argument) return name.replace("--", "");
    if (type === ParameterTypeEnum.alias) return name.replace("-", "");
    return name;
  }

  private getParameterValue(baseValue: string, hasValue: boolean): string {
    const value = hasValue ? baseValue.split("=")[1] : "";
    return this.clearParameterValue(value);
  }

  private clearParameterValue(value: string): string {
    return value.replace(/^("|'|`)/, "").replace(/("|'|`)$/, "");
  }
}
