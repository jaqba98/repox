import { singleton } from 'tsyringe';

@singleton()
/**
 * The app-service program is responsible for building project.
 * Argument | Alias | Description                           | Required | Value
 * --name   | -n    | Name of the project.                  | true     | string
 * --prod   | -p    | Build the project in production mode. | false    | boolean
 */
export class BuildProjectAppService {
  // TODO: I am here
  // constructor (
  //   private readonly writeHeader: WriteHeaderStep,
  //   private readonly getCommandArgStringValue: GetCommandArgStringValueStep,
  //   private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
  //   private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
  //   private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
  //   private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
  //   private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
  //   private readonly workspaceDomainStore: WorkspaceDomainStore,
  //   private readonly systemProgramExist: SystemProgramExistStep,
  //   private readonly projectExist: ProjectExistStep,
  //   private readonly targetExist: TargetExistStep,
  //   private readonly buildProject: BuildProjectStep,
  //   private readonly writeSuccess: WriteSuccessStep
  // ) {
  // }

  run (): boolean {
    return true;
    // if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    // const name = this.getCommandArgStringValue.run('name', 'n');
    // if (name === false) return false;
    // const prod = this.getCommandArgBooleanValue.run('prod', 'p', false);
    // if (prod === undefined) return false;
    // if (!this.goToWorkspaceRoot.run()) return false;
    // if (!this.buildWorkspaceDto.run()) return false;
    // if (!this.checkWorkspaceDto.run()) return false;
    // if (!this.buildWorkspaceDomain.run()) return false;
    // const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    // const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    // if (!this.systemProgramExist.run(packageManager)) return false;
    // if (!this.projectExist.run(name)) return false;
    // if (!this.targetExist.run(name, 'build')) return false;
    // if (!this.buildProject.run(name, prod, packageManager)) return false;
    // if (!this.writeSuccess.run()) return false;
    // return true;
  }
}
