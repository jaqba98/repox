import { container, singleton } from "tsyringe";
import { LauncherModel } from "@lib/launcher";
import { RepoxProgramEnum } from "../enum/repox-program.enum";
import { RepoxCommandEnum } from "../enum/repox-command.enum";
import {
  BuildProjectProgramService,
  DefaultDefaultProgramService,
  GenerateProjectProgramService,
  GenerateWorkspaceProgramService
} from "@lib/repox-program";

@singleton()
/**
 * The service is responsible for giving all programs
 * for repox project.
 */
export class RepoxLaunchProgramService {
  getPrograms(): LauncherModel {
    return {
      programs: [
        {
          programName: RepoxProgramEnum.default,
          commandName: RepoxCommandEnum.default,
          service: container.resolve(DefaultDefaultProgramService)
        },
        {
          programName: RepoxProgramEnum.generate,
          commandName: RepoxCommandEnum.workspace,
          service: container.resolve(GenerateWorkspaceProgramService)
        },
        {
          programName: RepoxProgramEnum.generate,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(GenerateProjectProgramService)
        },
        {
          programName: RepoxProgramEnum.build,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(BuildProjectProgramService)
        }
      ]
    };
  }
}
// todo: refactor
