// done
import { singleton } from 'tsyringe';

import { StepMessageAppService, ComplexMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { projectExistStepMsg } from '../../const/message/step-message.const';
import { projectNotExistErrorMsg } from '../../const/message/error-message.const';
import { specifyDifferentProjectNameWarningMsg } from '../../const/message/warning-message.const';

@singleton()
/**
 * The step dom-service is responsible for checking
 * if the given project exist.
 */
export class ProjectExistStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {}

  run (name: string): boolean {
    this.stepMessage.write(projectExistStepMsg(name));
    const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
    const { projects } = repoxJsonDomain;
    const project = Object.values(projects).find(project => project.name === name);
    if (project === undefined) {
      this.complexMessage.writeError([
        projectNotExistErrorMsg(name)
      ]);
      this.complexMessage.writeWarning([
        specifyDifferentProjectNameWarningMsg()
      ]);
      return false;
    }
    return true;
  }
}
