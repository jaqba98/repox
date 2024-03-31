// done
import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { WorkspaceDtoStore, WorkspaceFileEnum } from '@lib/repox-workspace'
import { pathNotExist, readJsonFile } from '@lib/utils'

import { buildWorkspaceDtoStepMsg } from '../../const/message/step-message.const'
import { configurationFileNotFoundErrorMsg } from '../../const/message/error-message.const'
import { repairConfigurationAndRunAgainWarningMsg } from '../../const/message/warning-message.const'

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
    if (!this.buildRepoxJsonDto()) return false
    if (!this.buildTsconfigJsonDto()) return false
    return true
  }

  private buildWorkspacePackageJsonDto (): boolean {
    if (pathNotExist(WorkspaceFileEnum.packageJson)) return this.writeError(WorkspaceFileEnum.packageJson)
    this.workspaceDtoStore.workspacePackageJsonDto = readJsonFile(WorkspaceFileEnum.packageJson)
    return true
  }

  private buildRepoxJsonDto (): boolean {
    if (pathNotExist(WorkspaceFileEnum.repoxJson)) return this.writeError(WorkspaceFileEnum.repoxJson)
    this.workspaceDtoStore.repoxJsonDto = readJsonFile(WorkspaceFileEnum.repoxJson)
    return true
  }

  private buildTsconfigJsonDto (): boolean {
    if (pathNotExist(WorkspaceFileEnum.tsconfigJson)) return this.writeError(WorkspaceFileEnum.tsconfigJson)
    this.workspaceDtoStore.tsconfigJsonDto = readJsonFile(WorkspaceFileEnum.tsconfigJson)
    return true
  }

  private writeError (workspaceFile: WorkspaceFileEnum): boolean {
    this.complexMessage.writeError([
      configurationFileNotFoundErrorMsg(workspaceFile)
    ])
    this.complexMessage.writeWarning([
      repairConfigurationAndRunAgainWarningMsg()
    ])
    return false
  }
}
