import { singleton } from "tsyringe";
import {
  FolderDoesNotExistService
} from "../infra/folder-does-not-exist.service";
import { SimpleMessageAppService } from "@lib/logger";
import { CreateFolderService } from "../infra/create-folder.service";
import { GoIntoService } from "../infra/go-into.service";
import { RunCommandService } from "../infra/run-command.service";
import {
  CreateEmptyFileService
} from "../infra/create-empty-file.service";
import {
  BuildConfigFileAppService,
  DomainConfigFileEnum
} from "@lib/domain";
import { WriteFileService } from "@lib/utils";
import { GIT_IGNORE_CONTENT } from "@lib/const";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly folderDoesNotExist: FolderDoesNotExistService,
    private readonly createFolder: CreateFolderService,
    private readonly goInto: GoIntoService,
    private readonly runCommand: RunCommandService,
    private readonly createEmptyFile: CreateEmptyFileService,
    private readonly buildConfigFile: BuildConfigFileAppService,
    private readonly writeFile: WriteFileService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  generateWorkspace(name: string): boolean {
    if (!this.folderDoesNotExist.notExist(name)) return false;
    this.createFolder.create(name);
    this.goInto.goInto(name);
    this.runCommand.exec("git init");
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("npm install typescript --save-dev");
    this.runCommand.exec("npm install jest --save-dev");
    this.runCommand.exec("tsc --init")
    this.runCommand.exec("sed -i -r '/^[ \\t]*\\//d; '/^[[:space:]]*$/d'; s/\\/\\*(.*?)\\*\\///g' tsconfig.json")
    this.createFolder.create("projects");
    this.createFolder.create("projects/apps");
    this.createEmptyFile.create("projects/apps/.gitkeep");
    this.createFolder.create("projects/libs");
    this.createEmptyFile.create("projects/libs/.gitkeep");
    this.createFolder.create("projects/tools");
    this.createEmptyFile.create("projects/tools/.gitkeep");
    this.createEmptyFile.create(DomainConfigFileEnum.configJson);
    const config = this.buildConfigFile.buildEmptyDomainConfig();
    this.writeFile.writeJson(DomainConfigFileEnum.configJson, config);
    this.createEmptyFile.create(".gitignore");
    this.writeFile.writeText(".gitignore", GIT_IGNORE_CONTENT);
    this.runCommand.exec("git add .");
    this.runCommand.exec(`git commit -m "init commit"`);
    this.goInto.goInto("..");
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Workspace created correctly!", 1, false, true
    );
    return true;
  }
}
