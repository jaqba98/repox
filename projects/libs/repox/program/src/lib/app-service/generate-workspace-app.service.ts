import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildDefaultDomainAppService,
  DomainConfigFileEnum
} from "@lib/domain";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderNotExist: FolderUtilsService,
    private readonly createFolder: FolderUtilsService,
    private readonly goInto: PathUtilsService,
    private readonly createEmptyFile: FileUtilsService,
    private readonly runCommand: RunCommandUtilsService,
    private readonly writeFile: FileUtilsService,
    private readonly buildDefaultDomain: BuildDefaultDomainAppService
  ) {
  }

  generateWorkspace(workspaceName: string): boolean {
    // Check whether the workspace folder not exist
    if (!this.folderNotExist.checkNotExist(workspaceName)) {
      return false;
    }
    // Create empty workspace structure
    this.createFolder.createFolder(workspaceName);
    this.goInto.changePath(workspaceName);
    this.createFolder.createFolder("projects");
    this.createFolder.createFolder("projects/apps");
    this.createFolder.createFolder("projects/libs");
    this.createFolder.createFolder("projects/tools");
    this.createEmptyFile.createEmptyFile("projects/apps/.gitkeep");
    this.createEmptyFile.createEmptyFile("projects/libs/.gitkeep");
    this.createEmptyFile.createEmptyFile("projects/tools/.gitkeep");
    // Init npm project
    this.runCommand.runCommand("npm init -y");
    // Install all required npm
    this.runCommand.runCommand("npm i typescript --save-dev");
    this.runCommand.runCommand("npm i tsc-alias --save-dev");
    // Init typescript configuration
    this.runCommand.runCommand("tsc --init");
    this.writeFile.writeJsonFile(
      DomainConfigFileEnum.tsconfigJson,
      this.buildDefaultDomain.buildTsconfig()
    );
    // Create the repox configuration
    this.createEmptyFile.createEmptyFile(DomainConfigFileEnum.repoxJson);
    this.writeFile.writeJsonFile(
      DomainConfigFileEnum.repoxJson,
      this.buildDefaultDomain.buildRepoxConfig()
    );
    // Init git repository
    this.runCommand.runCommand("git init");
    this.runCommand.runCommand("git config --local core.autocrlf false");
    this.createEmptyFile.createEmptyFile(DomainConfigFileEnum.gitignoreFile);
    this.writeFile.writeTextFile(
      DomainConfigFileEnum.gitignoreFile,
      this.buildDefaultDomain.buildGitIgnore()
    );
    this.runCommand.runCommand("git add .");
    this.runCommand.runCommand(`git commit -m "init commit"`);
    // Write success message
    // this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Workspace created correctly!", REPOX_LOGO
    );
    return true;
  }
}

// todo: refactor
