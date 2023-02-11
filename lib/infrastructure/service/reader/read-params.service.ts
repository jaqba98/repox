import { injectable } from "tsyringe";
import { ParamsTypeEnum } from "../../enum/parameter-type.enum";
import { ParamsDtoModel } from "../../model/params-dto.model";

@injectable()
/**
 * Service responsible for get parameters from command line.
 */
export class ReadParamsSvc {
  private lastParamsType = ParamsTypeEnum.program;

  read(): Array<ParamsDtoModel> {
    const { argv } = process;
    return argv
      .filter((_, index) => this.getProgramArg(index))
      .map((base, index) => ({ base, index }))
      .map((arg) => ({
        ...arg,
        type: this.getArgType(arg.base, arg.index),
      }))
      .map((arg) => ({
        ...arg,
        belong: this.getArgBelonging(arg.type),
      }))
      .map((arg) => ({
        ...arg,
        hasValue: this.baseHasValue(arg.base),
      }))
      .map((arg) => ({
        ...arg,
        name: this.getArgName(arg.base, arg.hasValue, arg.type),
      }))
      .map((arg) => ({
        ...arg,
        value: this.getArgValue(arg.base, arg.hasValue),
      }));
  }

  private getProgramArg(index: number): boolean {
    return index > 1;
  }

  private getArgType(base: string, index: number): ParamsTypeEnum {
    if (base.startsWith("--")) return ParamsTypeEnum.argument;
    if (base.startsWith("-")) return ParamsTypeEnum.alias;
    return index === 0 ? ParamsTypeEnum.program : ParamsTypeEnum.command;
  }

  private getArgBelonging(type: ParamsTypeEnum): ParamsTypeEnum {
    if (type === ParamsTypeEnum.program)
      this.lastParamsType = ParamsTypeEnum.program;
    if (type === ParamsTypeEnum.command)
      this.lastParamsType = ParamsTypeEnum.command;
    return this.lastParamsType;
  }

  private baseHasValue(base: string): boolean {
    return base.includes("=");
  }

  private getArgName(
    base: string,
    hasValue: boolean,
    type: ParamsTypeEnum
  ): string {
    const name = hasValue ? base.split("=")[0] : base;
    if (type === ParamsTypeEnum.argument) return name.replace("--", "");
    if (type === ParamsTypeEnum.alias) return name.replace("-", "");
    return name;
  }

  private getArgValue(base: string, hasValue: boolean): string {
    const value = hasValue ? base.split("=")[1] : "";
    return this.clearArgValue(value);
  }

  private clearArgValue(value: string): string {
    return value.replace(/^("|'|`)/, "").replace(/("|'|`)$/, "");
  }
}
