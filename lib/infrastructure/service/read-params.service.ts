import { injectable } from "tsyringe";
import { ArgTypeEnum } from "../enum/arg-type.enum";

@injectable()
/**
 * Service responsible for get parameters from command line.
 */
export class ReadParamsService {
  read(): Array<any> {
    return process.argv
      .filter((_, i) => i !== 0 && i !== 1)
      .map((arg, index) => ({
        arg,
        type: this.getArgType(arg, index),
      }));
  }

  private getArgType(arg: string, i: number): ArgTypeEnum {
    if (arg.startsWith("--")) return ArgTypeEnum.argument;
    if (arg.startsWith("-")) return ArgTypeEnum.alias;
    if (i === 0) return ArgTypeEnum.program;
    return ArgTypeEnum.command;
  }
}
