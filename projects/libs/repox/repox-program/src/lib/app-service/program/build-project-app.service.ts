import { singleton } from 'tsyringe';

import { CommandEnum } from '../../enum/launcher/command.enum';
import { ProgramEnum } from '../../enum/launcher/program.enum';
import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { WriteSuccessStep } from '../../dom-service/step/write-success.step';
import { GetCommandArgStringValueStep } from '../../dom-service/step/get-command-arg-string-value.step';

@singleton()
/**
 * The app-service program is responsible for building project.
 */
export class BuildProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringValueStep,
    // private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
    // private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    // private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    // private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    // private readonly workspaceDomainStore: WorkspaceDomainStore,
    // private readonly systemProgramExist: SystemProgramExistStep,
    // private readonly projectExist: ProjectExistStep,
    // private readonly targetExist: TargetExistStep,
    // private readonly buildProject: BuildProjectStep,
    private readonly writeSuccess: WriteSuccessStep
  ) {
  }

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    const name = this.getCommandArgStringValue.run('name', 'n');
    if (name === false) return false;
    // if (!this.goToWorkspaceRoot.run()) return false;
    // if (!this.buildWorkspaceDto.run()) return false;
    // if (!this.checkWorkspaceDto.run()) return false;
    // if (!this.buildWorkspaceDomain.run()) return false;
    // const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    // const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    // if (!this.systemProgramExist.run(packageManager)) return false;
    // if (!this.projectExist.run(name)) return false;
    // if (!this.targetExist.run(name, 'buildTs')) return false;
    // if (!this.buildProject.run(name)) return false;
    if (!this.writeSuccess.run()) return false;
    return true;
  }
}
