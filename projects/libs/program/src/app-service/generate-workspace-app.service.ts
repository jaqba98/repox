import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildDomainConfigFileAppService,
  DomainConfigFileEnum
} from "@lib/domain";
import {
  ExecFolderDoesNotExistService
} from "../infrastructure/exec/exec-folder-does-not-exist.service";
import {
  ExecCreateFolderService
} from "../infrastructure/exec/exec-create-folder.service";
import {
  ExecGoIntoService
} from "../infrastructure/exec/exec-go-into.service";
import {
  ExecRunCommandService
} from "../infrastructure/exec/exec-run-command.service";
import {
  ExecCreateEmptyFileService
} from "../infrastructure/exec/exec-create-empty-file.service";
import { WriteFileService } from "@lib/utils";
import { join } from "path";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly folderDoesNotExist: ExecFolderDoesNotExistService,
    private readonly createFolder: ExecCreateFolderService,
    private readonly goInto: ExecGoIntoService,
    private readonly runCommand: ExecRunCommandService,
    private readonly createEmptyFile: ExecCreateEmptyFileService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly writeFile: WriteFileService,
    private readonly buildDomainConfigFile: BuildDomainConfigFileAppService
  ) {
  }

  run(name: string): boolean {
    this.loggerMessageApp.writeInfo("Generate workspace", false, true, 0);
    if (!this.folderDoesNotExist.exec(name)) return false;
    this.createFolder.exec(name);
    this.goInto.exec(name);
    this.runCommand.exec("git init");
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("npm install typescript --save-dev");
    this.runCommand.exec("npm install jest --save-dev");
    this.runCommand.exec("tsc --init")
    this.createFolder.exec("projects");
    this.createFolder.exec("projects/apps");
    this.createEmptyFile.exec("projects/apps/", ".gitkeep");
    this.createFolder.exec("projects/libs");
    this.createEmptyFile.exec("projects/libs/", ".gitkeep");
    this.createFolder.exec("projects/tools");
    this.createEmptyFile.exec("projects/tools/", ".gitkeep");
    this.createEmptyFile.exec("./", DomainConfigFileEnum.domainConfigJson);
    const configJsonFile = join("./", DomainConfigFileEnum.domainConfigJson);
    const emptyConfigContent = this.buildDomainConfigFile.buildEmptyDomainConfig();
    this.writeFile.writeJson(configJsonFile, emptyConfigContent);
    this.createEmptyFile.exec("./", ".gitignore");
    this.goInto.exec("..");
    this.loggerMessageApp.writePlain("", 0);
    return true;
  }
}
// todo: refactor
