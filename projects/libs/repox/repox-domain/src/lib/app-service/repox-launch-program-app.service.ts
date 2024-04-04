import { container, singleton } from 'tsyringe';
import { RepoxCommandEnum, RepoxProgramEnum } from '@lib/repox-domain';
import {
  BuildProjectAppService,
  GenerateProjectAppService,
  GenerateWorkspaceAppService,
  LintProjectAppService,
  PublishNpmProgramService,
  RegenerateWorkspaceAppService,
  UnknownUnknownAppService
} from '@lib/repox-program';

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
          service: container.resolve(UnknownUnknownAppService)
        },
        {
          programName: RepoxProgramEnum.generate,
          commandName: RepoxCommandEnum.workspace,
          service: container.resolve(GenerateWorkspaceAppService)
        },
        {
          programName: RepoxProgramEnum.regenerate,
          commandName: RepoxCommandEnum.workspace,
          service: container.resolve(
            RegenerateWorkspaceAppService
          )
        },
        {
          programName: RepoxProgramEnum.generate,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(GenerateProjectAppService)
        },
        {
          programName: RepoxProgramEnum.build,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(BuildProjectAppService)
        },
        {
          programName: RepoxProgramEnum.publish,
          commandName: RepoxCommandEnum.npm,
          service: container.resolve(PublishNpmProgramService)
        },
        {
          programName: RepoxProgramEnum.lint,
          commandName: RepoxCommandEnum.project,
          service: container.resolve(LintProjectAppService)
        }
      ]
    };
  }
}

// todo: refactor the code
