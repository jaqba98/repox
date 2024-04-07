import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { buildProjectStepMsg } from '../../const/message/step-message.const';

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

  run (name: string): boolean {
    this.stepMessage.write(buildProjectStepMsg(name));
    const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
    const { projects } = repoxJsonDomain;
    const project = Object.values(projects).find(project => project.name === name);
    if (project === undefined) return false;
    // runCommand(`npx tsc --project ${target.development.tsconfig}`, true);
    // runCommand(`npx tsc-alias -p ${target.development.tsconfig}`, true);
    return true;
  }
}
