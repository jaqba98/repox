import { singleton } from 'tsyringe';

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { projectNotExistErrorMsg } from '../../const/message/error-message.const';
import { specifyDifferentProjectNameWarningMsg } from '../../const/message/warning-message.const';
import { checkProjectExistStepMsg } from '../../const/message/step-message.const';

@singleton()
/**
 * The step service is responsible for check project exist in workspace domain model.
 */
export class CheckProjectExistStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {
  }

  run (projectName: string): boolean {
    this.stepMessage.write(checkProjectExistStepMsg(projectName));
    // if (this.store.projectExist(projectName)) {
    //   return true
    // }
    this.complexMessage.writeError([
      projectNotExistErrorMsg(projectName)
    ]);
    this.complexMessage.writeWarning([
      specifyDifferentProjectNameWarningMsg()
    ]);
    return false;
  }
}
