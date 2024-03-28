import { singleton } from 'tsyringe'

import { WriteHeaderStep } from '../../dom-service/step/write-header.step'
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step'
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step'
import {
  BuildWorkspaceDomainStep
} from '../../dom-service/step/build-workspace-domain.step'
import { SaveWorkspaceDomainStep } from '../../dom-service/step/save-workspace-domain.step'
import { SaveWorkspaceDtoStep } from '../../dom-service/step/save-workspace-dto.step'
import { WriteSuccessStep } from '../../dom-service/step/write-success.step'
import { RunCommandStep } from '../../dom-service/step/run-command.step'
import { ProgramEnum } from '../../enum/launcher/program.enum'
import { CommandEnum } from '../../enum/launcher/command.enum'
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum'
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step'
import { RegenerateWorkspaceStep } from '../../dom-service/step/regenerate-workspace.step'
import {
  GetCommandArgBooleanValueStep
} from '../../dom-service/step/get-command-arg-boolean-value.step'

@singleton()
/**
 * The app service is responsible for regenerating workspace.
 * Argument | Alias | Description         | Required | Value
 * --force  | -f    | Run in forced mode. | true     | boolean
 */
export class RegenerateWorkspaceAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly runCommand: RunCommandStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly regenerateWorkspace: RegenerateWorkspaceStep,
    private readonly saveWorkspaceDomain: SaveWorkspaceDomainStep,
    private readonly saveWorkspaceDto: SaveWorkspaceDtoStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {
  }

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.regenerate, CommandEnum.workspace)) {
      return false
    }
    if (!this.getCommandArgBooleanValue.run('force', 'f')) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false
    if (!this.runCommand.run('npm install --global pnpm')) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false
    if (!this.goToWorkspaceRoot.run()) return false
    if (!this.buildWorkspaceDto.run()) return false
    if (!this.buildWorkspaceDomain.run()) return false
    if (!this.regenerateWorkspace.run()) return false
    if (!this.saveWorkspaceDomain.run()) return false
    if (!this.saveWorkspaceDto.run()) return false
    if (!this.runCommand.run('pnpm install --prefer-offline')) return false
    if (!this.runCommand.run('git init -b "main"')) return false
    if (!this.runCommand.run('git config core.autocrlf false')) return false
    if (!this.runCommand.run('git add .')) return false
    if (!this.writeSuccess.run()) return false
    return true
  }
}
