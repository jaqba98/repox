import { singleton } from 'tsyringe'

import { WorkspaceDomainStore } from '@lib/repox-workspace'

import { ProgramEnum } from '../../enum/launcher/program.enum'
import { CommandEnum } from '../../enum/launcher/command.enum'
import { WriteHeaderStep } from '../../dom-service/step/write-header.step'
import { GetCommandArgBooleanValueStep } from '../../dom-service/step/get-command-arg-boolean-value.step'
import { GetCommandArgStringArrayValueStep } from '../../dom-service/step/get-command-arg-string-array-value.step'
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step'
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step'
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step'
import { CheckWorkspaceDtoStep } from '../../dom-service/step/check-workspace-dto.step'
import { BuildWorkspaceDomainStep } from '../../dom-service/step/build-workspace-domain.step'
import { LintProjectStep } from '../../dom-service/step/lint-project.step'

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
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly lintProject: LintProjectStep
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
    if (!this.buildWorkspaceDto.run()) return false
    if (!this.checkWorkspaceDto.run()) return false
    if (!this.buildWorkspaceDomain.run()) return false
    const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain()
    const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions
    // Check system
    if (!this.systemProgramExist.run(packageManager)) return false
    // Lint projects
    if (!this.lintProject.run(packageManager, fix, projects)) return false
    return true
  }
}
