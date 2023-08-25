import { container, singleton } from "tsyringe";
import { type LauncherModel } from "@lib/launcher";
import {
  RepoxCommandEnum,
  RepoxProgramEnum
} from "@lib/repox-domain";
import {
  BuildProjectProgramService,
  DefaultDefaultProgramService,
  GenerateProjectProgramService,
  GenerateWorkspaceProgramService, LintProjectProgramService,
  PublishNpmProgramService
} from "@lib/repox-program";

@singleton()
/**
 * The app service is responsible for giving all programs
 * for repox project.
 */
export class RepoxLaunchProgramAppService {
  getPrograms (): LauncherModel {
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
        },
        {
          programName: RepoxProgramEnum.publish,
          commandName: RepoxCommandEnum.npm,
          service: container.resolve(PublishNpmProgramService)
        },
        {
          programName: RepoxProgramEnum.lint,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(LintProjectProgramService)
        }
      ]
    };
  }
}
// todo: refactor the file
