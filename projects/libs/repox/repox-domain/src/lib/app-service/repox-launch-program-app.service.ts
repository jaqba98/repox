import { container, singleton } from "tsyringe";
import {
  RepoxCommandEnum,
  RepoxProgramEnum
} from "@lib/repox-domain";
import {
  BuildProjectProgramService,
  DefaultDefaultProgramService,
  GenerateProjectProgramService,
  GenerateWorkspaceProgramService,
  LintProjectProgramService,
  PublishNpmProgramService,
  RegenerateWorkspaceProgramService
} from "@lib/repox-program";

@singleton()
/**
 * The app service is responsible for giving all programs
 * for repox project.
 */
export class RepoxLaunchProgramAppService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPrograms (): any {
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
          programName: RepoxProgramEnum.regenerate,
          commandName: RepoxCommandEnum.workspace,
          service: container.resolve(
            RegenerateWorkspaceProgramService
          )
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

// todo: refactor the code
