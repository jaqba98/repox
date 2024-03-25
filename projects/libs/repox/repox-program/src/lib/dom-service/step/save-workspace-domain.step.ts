import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDomainStore } from '@lib/repox-workspace'

import { saveWorkspaceDomainStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step service is responsible for saving workspace domain model.
 */
export class SaveWorkspaceDomainStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write(saveWorkspaceDomainStepMsg())
    this.store.save()
    return true
  }
}
