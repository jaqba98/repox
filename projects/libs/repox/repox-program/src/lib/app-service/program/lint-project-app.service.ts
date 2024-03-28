import { singleton } from 'tsyringe'

import { WriteHeaderStep } from '../../dom-service/step/write-header.step'
import { ProgramEnum } from '../../enum/launcher/program.enum'
import { CommandEnum } from '../../enum/launcher/command.enum'
import {
  GetCommandArgSingleValueStep
} from '../../dom-service/step/get-command-arg-single-value.step'
import { WriteSuccessStep } from '../../dom-service/step/write-success.step'
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step'
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum'
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step'
import { RunCommandStep } from '../../dom-service/step/run-command.step'

@singleton()
/**
 * The app service is responsible for linting projects.
 * Argument | Alias | Description            | Required | Value
 * --all    | -a    | Lint all projects.     | true     | string
 */
export class LintProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgSingleValue: GetCommandArgSingleValueStep,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly runCommand: RunCommandStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {
  }

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.lint, CommandEnum.project)) {
      return false
    }
    const all = this.getCommandArgSingleValue.run('all', 'a')
    if (all == null) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false
    if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false
    if (!this.goToWorkspaceRoot.run()) return false
    if (!this.runCommand.run('npx eslint **/*.ts')) return false
    if (!this.writeSuccess.run()) return false
    return true
  }
}
