import { singleton } from 'tsyringe';

@singleton()
/**
 * The app service is responsible for generating workspace from scratch.
 * Argument | Alias | Description            | Required | Value
 * --name   | -n    | Name of the workspace. | true     | string
 */
export class GenerateWorkspaceAppService {
  constructor (
    // private readonly writeHeader: WriteHeaderStep,
    // private readonly getCommandArgSingleValue: GetCommandArgSingleValueStep,
    // private readonly systemProgramExist: SystemProgramExistStep,
    // private readonly runCommand: RunCommandStep,
    // private readonly folderNotExist: FolderNotExistStep,
    // private readonly createFolder: CreateFolderStep,
    // private readonly changePath: ChangePathStep,
    // private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    // private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    // private readonly generateWorkspace: GenerateWorkspaceStep,
    // private readonly saveWorkspaceDomain: SaveWorkspaceDomainStep,
    // private readonly saveWorkspaceDto: SaveWorkspaceDtoStep,
    // private readonly writeSuccess: WriteSuccessStep
  ) {
  }

  run (): boolean {
    // if (!this.writeHeader.run(ProgramEnum.generate, CommandEnum.workspace)) {
    //   return false;
    // }
    // // const name = this.getCommandArgSingleValue.run('name', 'n');
    // // if (name == null) return false;
    // if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false;
    // if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false;
    // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
    // if (!this.runCommand.run('npm install --global pnpm')) return false;
    // if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false;
    // if (!this.folderNotExist.run('name')) return false;
    // if (!this.createFolder.run('name')) return false;
    // if (!this.changePath.run('name')) return false;
    // if (!this.buildWorkspaceDto.run()) return false;
    // if (!this.buildWorkspaceDomain.run()) return false;
    // if (!this.generateWorkspace.run()) return false;
    // if (!this.saveWorkspaceDomain.run()) return false;
    // if (!this.saveWorkspaceDto.run()) return false;
    // if (!this.runCommand.run('pnpm install --prefer-offline')) return false;
    // if (!this.runCommand.run('git init -b "main"')) return false;
    // if (!this.runCommand.run('git config core.autocrlf false')) return false;
    // if (!this.runCommand.run('git add .')) return false;
    // if (!this.runCommand.run('git commit -m "initial commit"')) return false;
    // if (!this.writeSuccess.run()) return false;
    return true;
  }
}
