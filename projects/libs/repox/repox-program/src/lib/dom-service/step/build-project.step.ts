import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { ExecutorEnum, WorkspaceDomainStore } from '@lib/repox-workspace';
import { runCommand } from '@lib/utils';

import { buildProjectStepMsg } from '../../const/message/step-message.const';
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum';

@singleton()
/**
 * The step service is responsible for building project to the workspace domain.
 */
export class BuildProjectStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore
  ) {
  }

  run (name: string, prod: boolean, packageManager: SystemProgramEnum): boolean {
    this.stepMessage.write(buildProjectStepMsg(name));
    const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
    const { projects } = repoxJsonDomain;
    const project = Object.values(projects).find(project => project.name === name);
    if (project === undefined) return false;
    const { build } = project.targets;
    if (build.executor === ExecutorEnum.typescript) {
      const tsconfig = prod ? build.production.tsconfig : build.development.tsconfig;
      const commandTsc = `--projects ${tsconfig}`;
      const commandTscAlias = `-p ${tsconfig}`;
      runCommand(this.buildCommandToRun(packageManager, commandTsc), true);
      runCommand(this.buildCommandToRun(packageManager, commandTscAlias), true);
      return true;
    }
    return false;
  }

  private buildCommandToRun (packageManager: SystemProgramEnum, command: string): string {
    switch (packageManager) {
      case SystemProgramEnum.npm:
        return `npx ${command}`;
      case SystemProgramEnum.pnpm:
        return `pnpm exec -- ${command}`;
      case SystemProgramEnum.yarn:
        return `yarn exec --offline -- ${command}`;
      default:
        throw new Error('Not supported packageManager!');
    }
  }
}
