import { singleton } from 'tsyringe';

import { ParamDomainStore } from '@lib/param-domain';
import { ComplexMessageAppService } from '@lib/logger';

import { UnknownUnknownAppService } from '../program/unknown-unknown-app.service';
import { GenerateWorkspaceAppService } from '../program/generate-workspace-app.service';
import { RegenerateWorkspaceAppService } from '../program/regenerate-workspace-app.service';
import { GenerateProjectAppService } from '../program/generate-project-app.service';
import {
  commandNotExistErrorMsg,
  programNotExistErrorMsg
} from '../../const/message/error-message.const';
import { ProgramEnum } from '../../enum/launcher/program.enum';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { BuildProjectAppService } from '../program/build-project-app.service';
import { LintProjectAppService } from '../program/lint-project-app.service';

@singleton()
/**
 * The app service is responsible for selecting service to run
 * by given program name and command name.
 */
export class RepoxLauncherAppService {
  constructor (
    private readonly store: ParamDomainStore,
    private readonly unknownUnknown: UnknownUnknownAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService,
    private readonly regenerateWorkspace: RegenerateWorkspaceAppService,
    private readonly buildProject: BuildProjectAppService,
    private readonly generateProject: GenerateProjectAppService,
    private readonly complexMessage: ComplexMessageAppService,
    private readonly lintProject: LintProjectAppService
  ) {
  }

  launch (): boolean {
    const { program, command } = this.store.get();
    if (program === ProgramEnum.unknown) return this.unknownProgram(program, command);
    if (program === ProgramEnum.generate) return this.generateProgram(program, command);
    if (program === ProgramEnum.regenerate) return this.regenerateProgram(program, command);
    if (program === ProgramEnum.build) return this.buildProgram(program, command);
    if (program === ProgramEnum.lint) return this.lintProgram(program, command);
    this.throwLauncherProgramError(program);
    return false;
  }

  private unknownProgram (program: string, command: string): boolean {
    if (command === CommandEnum.unknown) return this.unknownUnknown.runProgram();
    this.throwLauncherCommandError(program, command);
    return false;
  }

  private generateProgram (program: string, command: string): boolean {
    if (command === CommandEnum.workspace) return this.generateWorkspace.run();
    if (command === CommandEnum.project) return this.generateProject.run();
    this.throwLauncherCommandError(program, command);
    return false;
  }

  private regenerateProgram (program: string, command: string): boolean {
    if (command === CommandEnum.workspace) return this.regenerateWorkspace.run();
    this.throwLauncherCommandError(program, command);
    return false;
  }

  private buildProgram (program: string, command: string): boolean {
    if (command === CommandEnum.project) return this.buildProject.run();
    this.throwLauncherCommandError(program, command);
    return false;
  }

  private lintProgram (program: string, command: string): boolean {
    if (command === CommandEnum.project) return this.lintProject.run();
    this.throwLauncherCommandError(program, command);
    return false;
  }

  private throwLauncherProgramError (program: string): void {
    this.complexMessage.writeError([
      programNotExistErrorMsg(program)
    ]);
  }

  private throwLauncherCommandError (program: string, command: string): void {
    this.complexMessage.writeError([
      commandNotExistErrorMsg(program, command)
    ]);
  }
}
