import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infrastructure/folder-not-exist.service";
import { CreateFolderService } from "../infrastructure/create-folder.service";
import { ChangePathService } from "../infrastructure/change-path.service";
import {
  CreateEmptyFileService
} from "../infrastructure/create-empty-file.service";
import { RunCommandService } from "../infrastructure/run-command.service";
import { WriteFileService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildDefaultDomainAppService,
  DomainConfigFileEnum
} from "@lib/domain";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderNotExist: FolderNotExistService,
    private readonly createFolder: CreateFolderService,
    private readonly goInto: ChangePathService,
    private readonly createEmptyFile: CreateEmptyFileService,
    private readonly runCommand: RunCommandService,
    private readonly writeFile: WriteFileService,
    private readonly buildDefaultDomain: BuildDefaultDomainAppService
  ) {
  }

  generateWorkspace(workspaceName: string): boolean {
    // Check whether the workspace folder not exist
    if (!this.folderNotExist.checkNotExist(workspaceName)) {
      return false;
    }
    // Create empty workspace structure
    this.createFolder.create(workspaceName);
    this.goInto.change(workspaceName);
    this.createFolder.create("projects");
    this.createFolder.create("projects/apps");
    this.createFolder.create("projects/libs");
    this.createFolder.create("projects/tools");
    this.createEmptyFile.create("projects/apps/.gitkeep");
    this.createEmptyFile.create("projects/libs/.gitkeep");
    this.createEmptyFile.create("projects/tools/.gitkeep");
    // Init npm project
    this.runCommand.run("npm init -y");
    // Install all required npm
    this.runCommand.run("npm i typescript --save-dev");
    this.runCommand.run("npm i tsc-alias --save-dev");
    // Init typescript configuration
    this.runCommand.run("tsc --init");
    this.writeFile.writeJson(
      DomainConfigFileEnum.tsconfigJson,
      this.buildDefaultDomain.buildTsconfig()
    );
    // Create the repox configuration
    this.createEmptyFile.create(DomainConfigFileEnum.repoxJson);
    this.writeFile.writeJson(
      DomainConfigFileEnum.repoxJson,
      this.buildDefaultDomain.buildRepoxConfig()
    );
    // Init git repository
    this.runCommand.run("git init");
    this.runCommand.run("git config --local core.autocrlf false");
    this.createEmptyFile.create(DomainConfigFileEnum.gitignoreFile);
    this.writeFile.writeText(
      DomainConfigFileEnum.gitignoreFile,
      this.buildDefaultDomain.buildGitIgnore()
    );
    this.runCommand.run("git add .");
    this.runCommand.run(`git commit -m "init commit"`);
    // Write success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Workspace created correctly!", 1, false, true
    );
    return true;
  }
}
// todo: refactor
