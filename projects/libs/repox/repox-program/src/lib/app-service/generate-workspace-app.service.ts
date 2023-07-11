import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import {
  GenerateWorkspaceRepoxCommandDomainModel
} from "@lib/repox-domain";
import {
  BuildConfigFileAppService,
  ConfigFileEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderUtils: FolderUtilsService,
    private readonly pathUtils: PathUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly writeFile: FileUtilsService,
    private readonly buildConfigFile: BuildConfigFileAppService,
    private readonly newline: NewlineAppService
  ) {
  }

  generateWorkspace(
    commandModel: GenerateWorkspaceRepoxCommandDomainModel
  ): boolean {
    const { workspaceName } = commandModel;
    // Check whether the workspace folder not exist
    if (!this.folderUtils.checkNotExist(workspaceName)) {
      this.simpleMessage.writeError(
        `Workspace name ${workspaceName} is already taken!`
      );
      this.simpleMessage.writeWarning(
        "Choose another name and run process again."
      );
      return false;
    }
    // Create empty workspace structure
    this.simpleMessage.writePlain("Create empty workspace structure");
    this.folderUtils.createFolder(workspaceName);
    this.pathUtils.changePath(workspaceName);
    this.folderUtils.createFolder("projects");
    this.folderUtils.createFolder("projects/apps");
    this.folderUtils.createFolder("projects/libs");
    this.folderUtils.createFolder("projects/tools");
    this.fileUtils.createEmptyFile("projects/apps/.gitkeep");
    this.fileUtils.createEmptyFile("projects/libs/.gitkeep");
    this.fileUtils.createEmptyFile("projects/tools/.gitkeep");
    // Init npm project
    this.simpleMessage.writePlain("Init npm project");
    this.runCommandUtils.runCommand("npm init -y");
    // Install dependencies
    this.simpleMessage.writePlain("Install dependencies");
    this.runCommandUtils.runCommand("npm install typescript --save-dev");
    this.runCommandUtils.runCommand("npm install tsc-alias --save-dev");
    this.runCommandUtils.runCommand("npm install jest --save-dev");
    // Create typescript configuration
    this.simpleMessage.writePlain("Create typescript configuration");
    this.writeFile.writeJsonFile(
      ConfigFileEnum.tsconfigJsonFile,
      this.buildConfigFile.buildDefaultTsconfigJsonFile()
    );
    // Create repox configuration
    this.simpleMessage.writePlain("Create repox configuration");
    this.writeFile.writeJsonFile(
      ConfigFileEnum.repoxJsonFile,
      this.buildConfigFile.buildDefaultRepoxJsonFile()
    );
    // Create jest configuration
    this.simpleMessage.writePlain("Create jest configuration");
    this.writeFile.writeTextFile(
      ConfigFileEnum.jestTsFile,
      this.buildConfigFile.buildDefaultRootJestTsFile()
    );
    // Create gitignore file
    this.simpleMessage.writePlain("Create gitignore file");
    this.writeFile.writeTextFile(
      ConfigFileEnum.gitignoreTextFile,
      this.buildConfigFile.buildDefaultGitignoreTextFile()
    );
    // Init git repository
    this.simpleMessage.writePlain("Init git repository");
    this.runCommandUtils.runCommand("git init");
    this.runCommandUtils.runCommand("git config --local core.autocrlf false");
    this.runCommandUtils.runCommand("git add .");
    this.runCommandUtils.runCommand(`git commit -m "init commit"`);
    // Write success message
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess("Workspace created correctly!");
    return true;
  }
}

// todo: refactor
