import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDomainStore } from '@lib/repox-workspace'

import { buildWorkspaceDomainStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step service is responsible for building workspace domain model.
 */
export class BuildWorkspaceDomainStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write(buildWorkspaceDomainStepMsg())
    this.store.build()
    return true
  }
}
