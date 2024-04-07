import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { buildProjectStepMsg } from '../../const/message/step-message.const';
import { runCommand } from '@lib/utils';

@singleton()
/**
 * The step service is responsible for building project to the workspace domain.
 */
export class BuildProjectStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore
  ) {
  }

  run (name: string): boolean {
    this.stepMessage.write(buildProjectStepMsg(name));
    if (this.store.workspaceDomain === undefined) return false;
    const project = this.store.workspaceDomain.repoxJsonDomain.projects[name];
    const target = project.targets.buildTs;
    runCommand(`npx tsc --project ${target.development.tsconfig}`, true);
    runCommand(`npx tsc-alias -p ${target.development.tsconfig}`, true);
    return true;
  }
}
