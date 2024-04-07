import { singleton } from 'tsyringe';

import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { ProgramEnum } from '../../enum/launcher/program.enum';
import { GetCommandArgStringValueStep } from '../../dom-service/step/get-command-arg-string-value.step';
import { GoToWorkspaceRootStep } from '../../dom-service/step/go-to-workspace-root.step';
import { BuildWorkspaceDomainStep } from '../../dom-service/step/build-workspace-domain.step';
import { BuildWorkspaceDtoStep } from '../../dom-service/step/build-workspace-dto.step';
import { CheckWorkspaceDtoStep } from '../../dom-service/step/check-workspace-dto.step';
import { SystemProgramExistStep } from '../../dom-service/step/system-program-exist.step';
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum';

@singleton()
/**
 * The app-service program is responsible for building project.
 */
export class BuildProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringValueStep,
    private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly systemProgramExist: SystemProgramExistStep
  ) {
  }

  run (): boolean {
    // Display headline
    if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    // Get arguments
    const name = this.getCommandArgStringValue.run('name', 'n');
    if (name === false) return false;
    // Build workspace domain model
    if (!this.goToWorkspaceRoot.run()) return false;
    if (!this.buildWorkspaceDto.run()) return false;
    if (!this.checkWorkspaceDto.run()) return false;
    if (!this.buildWorkspaceDomain.run()) return false;
    const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    // Check system
    if (!this.systemProgramExist.run(packageManager)) return false;
    return true;
  }
}
