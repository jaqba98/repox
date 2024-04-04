// done
import { singleton } from 'tsyringe';

import { NewlineAppService, SimpleMessageAppService, StepMessageAppService } from '@lib/logger';
import { createPath, runCommand } from '@lib/utils';
import { type RepoxJsonDomainProjectModel, WorkspaceDomainStore } from '@lib/repox-workspace';

import { lintProjectStepMsg } from '../../const/message/step-message.const';
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum';
import { checkProjectPlainMsg } from '../../const/message/plain-message.const';
import { projectIsCorrectSuccessMsg } from '../../const/message/success-message.enum';

@singleton()
/**
 * The step dom-service is responsible for linting projects.
 */
export class LintProjectStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly newline: NewlineAppService
  ) {}

  run (packageManager: SystemProgramEnum, fix: boolean, projects: string[]): boolean {
    this.stepMessage.write(lintProjectStepMsg());
    const projectsToLint = this.getProjectsToLint(projects);
    const programArg = 'eslint';
    const fixArg = fix ? '--fix' : '';
    for (const projectToLint of projectsToLint) {
      const pathArg = createPath(projectToLint.src, '**/*.ts');
      const command = `${programArg} ${pathArg} ${fixArg}`;
      const commandToRun = this.buildCommandToRun(packageManager, command);
      this.newline.writeNewline();
      this.simpleMessage.writePlain(checkProjectPlainMsg(projectToLint.name));
      runCommand(commandToRun, true);
      this.newline.writeNewline();
      this.simpleMessage.writeSuccess(projectIsCorrectSuccessMsg());
    }
    return true;
  }

  private getProjectsToLint (projects: string[]): RepoxJsonDomainProjectModel[] {
    const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
    if (projects.length === 0) {
      return Object.values(repoxJsonDomain.projects);
    }
    return Object.values(repoxJsonDomain.projects)
      .filter(project => projects.includes(project.name));
  }

  private buildCommandToRun (packageManager: SystemProgramEnum, command: string): string {
    switch (packageManager) {
      case SystemProgramEnum.npm:
        return `npx ${command}`;
      case SystemProgramEnum.pnpm:
        return `pnpm exec ${command}`;
      case SystemProgramEnum.yarn:
        return `yarn exec ${command}`;
      default:
        throw new Error('Not supported packageManager!');
    }
  }
}
