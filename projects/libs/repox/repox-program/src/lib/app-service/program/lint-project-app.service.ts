import { singleton } from 'tsyringe'

import { ProgramEnum } from '../../enum/launcher/program.enum'
import { CommandEnum } from '../../enum/launcher/command.enum'
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum'
import { WriteHeaderStep } from '../../dom-service/step/write-header.step'
import { GetCommandArgBooleanValueStep } from '../../dom-service/step/get-command-arg-boolean-value.step'
import { GetCommandArgStringArrayValueStep } from '../../dom-service/step/get-command-arg-string-array-value.step'
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step'
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step'

@singleton()
/**
 * The app-service program is responsible for linting projects.
 * Argument   | Alias | Description | Required | Value
 * --projects | -p    |             | false    | string[]
 * --fix      | -f    |             | false    | boolean
 */
export class LintProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringArrayValue: GetCommandArgStringArrayValueStep,
    private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly systemProgramExist: SystemProgramExistStep
  ) {}

  run (): boolean {
    // Display headline
    if (!this.writeHeader.run(ProgramEnum.lint, CommandEnum.project)) return false
    // Get arguments
    const projects = this.getCommandArgStringArrayValue.run('projects', 'p', false)
    if (projects === false) return false
    const fix = this.getCommandArgBooleanValue.run('fix', 'f', false)
    if (!fix) return false
    // Build workspace domain model
    if (!this.goToWorkspaceRoot.run()) return false
    // Check system
    // TODO the package manager should be taken from repox.json configuration
    if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false
    return true
  }
}
