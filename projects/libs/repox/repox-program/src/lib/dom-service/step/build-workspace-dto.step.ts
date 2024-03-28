import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDtoStore } from '@lib/repox-workspace'

import { buildWorkspaceDtoStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step service is responsible for building workspace dto model.
 */
export class BuildWorkspaceDtoStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDtoStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write(buildWorkspaceDtoStepMsg())
    this.store.load()
    return true
  }
}
