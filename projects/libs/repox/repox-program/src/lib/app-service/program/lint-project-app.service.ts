import { singleton } from 'tsyringe'

import { ProgramEnum } from '../../enum/launcher/program.enum'
import { CommandEnum } from '../../enum/launcher/command.enum'
import { WriteHeaderStep } from '../../dom-service/step/write-header.step'
import { GetCommandArgBooleanValueStep } from '../../dom-service/step/get-command-arg-boolean-value.step'

@singleton()
/**
 * The app-service program is responsible for linting projects.
 * Argument | Alias | Description | Required | Value
 * --fix    | -f    |             | False    | Boolean
 */
export class LintProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep
  ) {}

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.lint, CommandEnum.project)) return false
    const fix = this.getCommandArgBooleanValue.run('fix', 'f', false)
    if (!fix) return false
    return true
  }

  // constructor (
  // private readonly systemProgramExist: SystemProgramExistStep,
  // private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
  // private readonly runCommand: RunCommandStep,
  // private readonly writeSuccess: WriteSuccessStep
  // ) {
  // }

  // run (): boolean {
  // const all = this.getCommandArgBooleanValue.run('all', 'a')
  // if (all == null) return false
  // if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false
  // if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false
  // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false
  // if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false
  // if (!this.goToWorkspaceRoot.run()) return false
  // if (!this.runCommand.run('npx eslint **/*.ts --fix', true)) return false
  // if (!this.writeSuccess.run()) return false
  //   return true
  // }
}
