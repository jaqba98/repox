import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDtoStore } from '@lib/repox-workspace'

@singleton()
/**
 * The app service is responsible for saving workspace dto model.
 */
export class SaveWorkspaceDtoAppService {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDtoStore: WorkspaceDtoStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write('Save Workspace DTO')
    this.workspaceDtoStore.save()
    return true
  }
}
