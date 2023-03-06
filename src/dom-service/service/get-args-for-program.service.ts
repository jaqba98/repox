import { ProgramEnum } from "../../enum/program.enum";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";
import { singleton } from "tsyringe";

@singleton()
export class GetArgsForProgramService {
  getArgs(program: ProgramEnum): Array<ArgumentEnum | AliasEnum> {
    switch (program) {
      case ProgramEnum.generate:
        return [];
      default:
        return [];
    }
  }
}
