import { injectable } from "tsyringe";
import { ParamsTypeEnum } from "../../enum/params-type.enum";
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
        ...this.getArgNameAndValue(arg.base, arg.hasValue, arg.type),
      }));
  }

  private getProgramArg(index: number): boolean {
    return index > 1;
  }

  private getArgType(base: string, index: number): ParamsTypeEnum {
    if (base.startsWith("--")) return ParamsTypeEnum.argument;
    if (base.startsWith("-")) return ParamsTypeEnum.alias;
    return index === 0
      ? ParamsTypeEnum.program
      : ParamsTypeEnum.command;
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

  private getArgNameAndValue(
    base: string,
    hasValue: boolean,
    type: ParamsTypeEnum
  ): { name: string; value: string } {
    const name = hasValue ? base.split("=")[0] : base;
    const value = hasValue ? base.split("=")[1] : "";
    switch (type) {
      case ParamsTypeEnum.argument:
        return { name: name.replace("--", ""), value };
      case ParamsTypeEnum.alias:
        return { name: name.replace("-", ""), value };
      default:
        return { name, value };
    }
  }
}
