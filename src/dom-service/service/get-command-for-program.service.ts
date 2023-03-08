// todo: refactor
import { singleton } from "tsyringe";
import { CommandEnum } from "../../enum/command.enum";
import { ProgramEnum } from "../../enum/program.enum";

@singleton()
export class GetCommandForProgramService {
  getCommands(program: ProgramEnum): Array<CommandEnum> {
    switch (program) {
      case ProgramEnum.generate:
        return [CommandEnum.workspace];
      default:
        return [];
    }
  }
}