import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/parameter";
import {
  GenerateWorkspaceModel
} from "../model/program/program-argument.model";
import {
  BuildProgramModelService
} from "../dom-service/build-program-model.service";
import { LoggerMessageAppService } from "@lib/logger";
import {
  ExecProgramInstalledService
} from "../infrastructure/exec/exec-program-installed.service";
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
import { DomainConfigFileEnum } from "@lib/domain";

@singleton()
/**
 * The program service is responsible for run program
 * generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly buildProgramModel: BuildProgramModelService,
    private readonly loggerMessageApp: LoggerMessageAppService,
    private readonly programInstalled: ExecProgramInstalledService,
    private readonly folderDoesNotExist: ExecFolderDoesNotExistService,
    private readonly createFolder: ExecCreateFolderService,
    private readonly goInto: ExecGoIntoService,
    private readonly runCommand: ExecRunCommandService,
    private readonly createEmptyFile: ExecCreateEmptyFileService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateWorkspaceModel = this.buildProgramModel
      .buildGenerateWorkspaceModel(paramDomain);
    this.loggerMessageApp.writeInfo("Running the command: Generate Workspace", true, true, 1);
    this.loggerMessageApp.writeInfo("System verification", false, true, 0);
    this.loggerMessageApp.writeInfo("Checking if git is installed", false, false, 0);
    if (!this.programInstalled.exec("git")) return;
    if (!this.programInstalled.exec("node")) return;
    if (!this.programInstalled.exec("npm")) return;
    this.loggerMessageApp.writePlain("", 0);
    this.generateWorkspace(model.name);
  }

  private generateWorkspace(name: string): void {
    this.loggerMessageApp.writeInfo("Generate workspace", false, true, 0);
    if (!this.folderDoesNotExist.exec(name)) return;
    this.createFolder.exec(name);
    this.goInto.exec(name);
    this.runCommand.exec("git init");
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("npm install typescript --save-dev");
    this.runCommand.exec("npm install jest --save-dev");
    this.runCommand.exec("tsc --init")
    this.createFolder.exec("projects");
    this.createFolder.exec("projects/apps");
    this.createEmptyFile.exec("projects/tools/", ".gitkeep");
    this.createFolder.exec("projects/libs");
    this.createEmptyFile.exec("projects/tools/", ".gitkeep");
    this.createFolder.exec("projects/tools");
    this.createEmptyFile.exec("projects/tools/", ".gitkeep");
    this.createEmptyFile.exec("./", DomainConfigFileEnum.domainConfigJson);
    this.createEmptyFile.exec("./", ".gitignore");
    this.goInto.exec("..");
  }
}
