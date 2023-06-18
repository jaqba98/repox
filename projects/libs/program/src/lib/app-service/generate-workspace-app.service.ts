import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infrastructure/folder-not-exist.service";
import { CreateFolderService } from "../infrastructure/create-folder.service";
import { GoIntoService } from "../infrastructure/go-into.service";
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
    private readonly goInto: GoIntoService,
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
    this.goInto.goInto(workspaceName);
    this.createFolder.create("projects");
    this.createFolder.create("projects/apps");
    this.createFolder.create("projects/libs");
    this.createFolder.create("projects/tools");
    this.createEmptyFile.create("projects/apps/.gitkeep");
    this.createEmptyFile.create("projects/libs/.gitkeep");
    this.createEmptyFile.create("projects/tools/.gitkeep");
    // Init npm project
    this.runCommand.exec("npm init -y");
    // Install all required npm
    this.runCommand.exec("npm i typescript --save-dev");
    this.runCommand.exec("npm i tsc-alias --save-dev");
    // Init typescript configuration
    this.runCommand.exec("tsc --init");
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
    this.runCommand.exec("git init");
    this.runCommand.exec("git config --local core.autocrlf false");
    this.createEmptyFile.create(DomainConfigFileEnum.gitignoreFile);
    this.writeFile.writeText(
      DomainConfigFileEnum.gitignoreFile,
      this.buildDefaultDomain.buildGitIgnore()
    );
    this.runCommand.exec("git add .");
    this.runCommand.exec(`git commit -m "init commit"`);
    // Write success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Workspace created correctly!", 1, false, true
    );
    return true;
  }
}
