// done
import { singleton } from 'tsyringe';

import { ProgramEnum } from '../../enum/launcher/program.enum';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step';
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step';
import { CheckWorkspaceDtoStep } from '../../dom-service/step/check-workspace-dto.step';
import { BuildWorkspaceDomainStep } from '../../dom-service/step/build-workspace-domain.step';
import { LintProjectStep } from '../../dom-service/step/lint-project.step';
import { WriteSuccessStep } from '../../dom-service/step/write-success.step';
import { GetCommandArgBooleanValueStep } from '../../dom-service/step/get-command-arg-boolean-value.step';
import { GetCommandArgStringArrayValueStep } from '../../dom-service/step/get-command-arg-string-array-value.step';
import { PackageManagerExistStep } from '../../dom-service/step/package-manager-exist.step';

@singleton()
/**
 * The app-service program is responsible for linting projects.
 * Argument   | Alias | Description | Required | Value
 * --projects | -p    | Specify the project list that should be processed      | false    | string[]
 * --fix      | -f    | Specify whether to run the lint command in repair mode | false    | boolean
 */
export class LintProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringArrayValueStep,
    private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly packageManagerExist: PackageManagerExistStep,
    private readonly lintProject: LintProjectStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {}

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.lint, CommandEnum.project)) return false;
    const projects = this.getCommandArgStringValue.run('projects', 'p', false);
    if (projects === false) return false;
    const fix = this.getCommandArgBooleanValue.run('fix', 'f', false);
    if (fix === undefined) return false;
    if (!this.goToWorkspaceRoot.run()) return false;
    if (!this.buildWorkspaceDto.run()) return false;
    if (!this.checkWorkspaceDto.run()) return false;
    if (!this.buildWorkspaceDomain.run()) return false;
    if (!this.packageManagerExist.run()) return false;
    if (!this.lintProject.run(projects, fix)) return false;
    if (!this.writeSuccess.run()) return false;
    return true;
  }
}
