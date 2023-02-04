import { injectable } from "tsyringe";
import { ArgTypeEnum } from "../enum/arg-type.enum";
import { ParamsModel } from "../model/params.model";

@injectable()
/**
 * Service responsible for get parameters from command line.
 */
export class ReadParamsService {
  private lastArgType: ArgTypeEnum = ArgTypeEnum.program;

  read(): Array<ParamsModel> {
    return this.getAllArgs()
      .map((base) => ({ base }))
      .filter((_, index) => this.getProgramArg(index))
      .map((arg, index) => ({ ...arg, index }))
      .map((arg) => ({ ...arg, type: this.getArgType(arg.base, arg.index) }))
      .map((arg) => ({ ...arg, belong: this.getArgBelonging(arg.type) }))
      .map((arg) => ({ ...arg, hasValue: this.isBaseHasValue(arg.base) }))
      .map((arg) => ({
        ...arg,
        data: this.getArgData(arg.base, arg.hasValue, arg.type),
      }));
  }

  private getAllArgs(): Array<string> {
    return process.argv;
  }

  private getProgramArg(index: number): boolean {
    return index > 1;
  }

  private getArgType(base: string, index: number): ArgTypeEnum {
    if (base.startsWith("--")) return ArgTypeEnum.argument;
    if (base.startsWith("-")) return ArgTypeEnum.alias;
    if (index === 0) return ArgTypeEnum.program;
    return ArgTypeEnum.command;
  }

  private getArgBelonging(type: ArgTypeEnum): ArgTypeEnum {
    if (type === ArgTypeEnum.command) this.lastArgType = type;
    return this.lastArgType;
  }

  private isBaseHasValue(base: string): boolean {
    return base.includes("=");
  }

  private getArgData(
    base: string,
    hasValue: boolean,
    type: ArgTypeEnum
  ): ParamsModel["data"] {
    const name = hasValue ? base.split("=")[0] : base;
    const value = hasValue ? base.split("=")[1] : "";
    if (type === ArgTypeEnum.argument) {
      return { name: name.replace("--", ""), value };
    }
    if (type === ArgTypeEnum.alias) {
      return { name: name.replace("-", ""), value };
    }
    return { name, value };
  }
}
