import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'

import { buildWorkspaceDomainStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step dom-service is responsible for
 * building workspace domain model.
 */
export class BuildWorkspaceDomainStep {
  constructor (
    private readonly stepMessage: StepMessageAppService
  ) {
  }

  run (): boolean {
    this.stepMessage.write(buildWorkspaceDomainStepMsg())
    return true
  }
}
