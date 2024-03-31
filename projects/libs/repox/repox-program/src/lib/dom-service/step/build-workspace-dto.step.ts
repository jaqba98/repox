import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { WorkspaceDtoStore, WorkspaceFileEnum } from '@lib/repox-workspace'

import { buildWorkspaceDtoStepMsg } from '../../const/message/step-message.const'
import { pathNotExist, readJsonFile } from '@lib/utils'

@singleton()
/**
 * The step dom-service is responsible for
 * building workspace dto model.
 */
export class BuildWorkspaceDtoStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDtoStore: WorkspaceDtoStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {}

  run (): boolean {
    this.stepMessage.write(buildWorkspaceDtoStepMsg())
    if (!this.buildWorkspacePackageJsonDto()) return false
    return true
  }

  private buildWorkspacePackageJsonDto (): boolean {
    if (pathNotExist(WorkspaceFileEnum.packageJson)) {
      this.complexMessage.writeError([])
      return false
    }
    this.workspaceDtoStore.workspacePackageJsonDto = readJsonFile(WorkspaceFileEnum.packageJson)
    return true
  }
}
