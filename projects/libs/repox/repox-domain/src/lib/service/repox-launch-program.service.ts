import { LauncherModel } from "@lib/launcher";
import {
  CommandRepoxEnum,
  ProgramRepoxEnum
} from "@tool/repox-domain";
import { container, singleton } from "tsyringe";
import {
  BuildProjectProgramService,
  DefaultDefaultProgramService, GenerateProjectProgramService,
  GenerateWorkspaceProgramService
} from "@lib/repox-program";

@singleton()
/**
 * The service is responsible for
 * give all programs for repox project.
 */
export class RepoxLaunchProgramService {
  getPrograms(): LauncherModel {
    return {
      programs: [
        {
          programName: ProgramRepoxEnum.default,
          commandName: CommandRepoxEnum.default,
          service: container.resolve(DefaultDefaultProgramService)
        },
        {
          programName: ProgramRepoxEnum.generate,
          commandName: CommandRepoxEnum.workspace,
          service: container.resolve(GenerateWorkspaceProgramService)
        },
        {
          programName: ProgramRepoxEnum.generate,
          commandName: CommandRepoxEnum.project,
          service: container.resolve(GenerateProjectProgramService)
        },
        {
          programName: ProgramRepoxEnum.build,
          commandName: CommandRepoxEnum.project,
          service: container.resolve(BuildProjectProgramService)
        }
      ]
    };
  }
}
