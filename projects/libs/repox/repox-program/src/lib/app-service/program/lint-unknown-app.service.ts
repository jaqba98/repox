// done
import { singleton } from 'tsyringe';

import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { ProgramEnum } from '../../enum/launcher/program.enum';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step';
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step';
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step';
import { CheckWorkspaceDtoStep } from '../../dom-service/step/check-workspace-dto.step';
import { BuildWorkspaceDomainStep } from '../../dom-service/step/build-workspace-domain.step';
import { LintProjectStep } from '../../dom-service/step/lint-project.step';
import { WriteSuccessStep } from '../../dom-service/step/write-success.step';
import { GetProgramArgStringArrayValueStep } from '../../dom-service/step/get-program-arg-string-array-value.step';
import { GetProgramArgBooleanValueStep } from '../../dom-service/step/get-program-arg-boolean-value.step';

@singleton()
/**
 * The app-service program is responsible for linting projects.
 * Argument   | Alias | Description | Required | Value
 * --projects | -p    | Specify the project list that should be processed      | false    | string[]
 * --fix      | -f    | Specify whether to run the lint command in repair mode | false    | boolean
 */
export class LintUnknownAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getProgramArgStringArrayValue: GetProgramArgStringArrayValueStep,
    private readonly getProgramArgBooleanValue: GetProgramArgBooleanValueStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly lintProject: LintProjectStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {}

  run (): boolean {
    // Display headline
    if (!this.writeHeader.run(ProgramEnum.lint, CommandEnum.unknown)) return false;
    // Get arguments
    const projects = this.getProgramArgStringArrayValue.run('projects', 'p', false);
    if (projects === false) return false;
    const fix = this.getProgramArgBooleanValue.run('fix', 'f', false);
    if (fix === undefined) return false;
    // Build workspace domain model
    if (!this.goToWorkspaceRoot.run()) return false;
    if (!this.buildWorkspaceDto.run()) return false;
    if (!this.checkWorkspaceDto.run()) return false;
    if (!this.buildWorkspaceDomain.run()) return false;
    const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    // Check system
    if (!this.systemProgramExist.run(packageManager)) return false;
    // Lint projects
    if (!this.lintProject.run(packageManager, fix, projects)) return false;
    if (!this.writeSuccess.run()) return false;
    return true;
  }
}
