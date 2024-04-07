import { singleton } from 'tsyringe';

import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { CommandEnum } from '../../enum/launcher/command.enum';
import { ProgramEnum } from '../../enum/launcher/program.enum';
import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { WriteSuccessStep } from '../../dom-service/step/write-success.step';
import { GetCommandArgStringValueStep } from '../../dom-service/step/get-command-arg-string-value.step';
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step';
import { BuildWorkspaceDomainStep } from '../../dom-service/step/build-workspace-domain.step';
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step';
import { CheckWorkspaceDtoStep } from '../../dom-service/step/check-workspace-dto.step';
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step';
import { ProjectExistStep } from '../../dom-service/step/project-exist.step';
import { TargetExistStep } from '../../dom-service/step/target-exist.step';
import { BuildProjectStep } from '../../dom-service/step/build-project.step';
import { GetCommandArgBooleanValueStep } from '../../dom-service/step/get-command-arg-boolean-value.step';

@singleton()
/**
 * The app-service program is responsible for building project.
 * Argument   | Alias | Description              | Required | Value
 * --name     | -n    | Name of the project      | true     | string
 */
export class BuildProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringValueStep,
    private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly projectExist: ProjectExistStep,
    private readonly targetExist: TargetExistStep,
    private readonly buildProject: BuildProjectStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {
  }

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    const name = this.getCommandArgStringValue.run('name', 'n');
    if (name === false) return false;
    const prod = this.getCommandArgBooleanValue.run('prod', 'p', false);
    if (prod === undefined) return false;
    if (!this.goToWorkspaceRoot.run()) return false;
    if (!this.buildWorkspaceDto.run()) return false;
    if (!this.checkWorkspaceDto.run()) return false;
    if (!this.buildWorkspaceDomain.run()) return false;
    const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    if (!this.systemProgramExist.run(packageManager)) return false;
    if (!this.projectExist.run(name)) return false;
    if (!this.targetExist.run(name, 'build')) return false;
    if (!this.buildProject.run(name, prod, packageManager)) return false;
    if (!this.writeSuccess.run()) return false;
    return true;
  }
}
