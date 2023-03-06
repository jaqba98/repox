import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";

@singleton()
export class GetRequiredArgsForProgramService {
  getRequiredArgs(program: ProgramEnum): Array<{
    argument: ArgumentEnum,
    alias: AliasEnum
  }> {
    switch (program) {
      case ProgramEnum.generate:
        return [];
      default:
        return [];
    }
  }
}
