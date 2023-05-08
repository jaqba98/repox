import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  BuildCommandModel
} from "../../dom-service/builder/build-command-model";
import {
  GenerateWorkspaceModel
} from "../../model/command/program-default-model";
import { WriteLog } from "../../infra/service/writer/write-log";
import {
  msgRunCommandInfo
} from "../../infra/service/builder/message/info-msg-builder.service";
import {
  buildInfoMsg,
  newline
} from "../../infra/service/builder/message/base-msg-builder";
import {
  ExecProgramInstalled
} from "../../infra/service/exec/exec-program-installed";
import {
  ExecRunCommand
} from "../../infra/service/exec/exec-run-command";
import {
  ExecCreateFolder
} from "../../infra/service/exec/exec-create-folder";
import {
  ExecCreateFile
} from "../../infra/service/exec/exec-create-file";
import { ExecGoInto } from "../../infra/service/exec/exec-go-into";
import {
  ExecFolderDoesNotExist
} from "../../infra/service/exec/exec-folder-does-not-exist";
import {
  GetConfigFileName
} from "../../infra/service/converter/get-config-file-name";
import { ConfigFile } from "../../infra/enum/config-file";

/**
 * The command service is responsible for run command
 * generate workspace.
 */
@singleton()
export class GenerateWorkspaceApp {
  constructor(
    private readonly buildCommandModel: BuildCommandModel,
    private readonly writeLog: WriteLog,
    private readonly programInstalled: ExecProgramInstalled,
    private readonly runCommand: ExecRunCommand,
    private readonly createFolder: ExecCreateFolder,
    private readonly createFile: ExecCreateFile,
    private readonly goInto: ExecGoInto,
    private readonly folderDoesNotExist: ExecFolderDoesNotExist,
    private readonly getConfigFileName: GetConfigFileName
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateWorkspaceModel = this.buildCommandModel
      .buildGenerateWorkspaceModel(paramDomain);
    this.writeLog.message(msgRunCommandInfo("generate workspace"));
    this.writeLog.message(newline());
    this.writeLog.message(buildInfoMsg("System verification"));
    const git = this.programInstalled.exec("git");
    if (!git) return;
    const node = this.programInstalled.exec("node");
    if (!node) return;
    const npm = this.programInstalled.exec("npm");
    if (!npm) return;
    this.writeLog.message(newline());
    const config = this.getConfigFileName.getConfig(model.config);
    this.generateWorkspace(model.name, config);
    this.writeLog.message(newline());
  }

  private generateWorkspace(name: string, config: ConfigFile): void {
    this.writeLog.message(buildInfoMsg(
      `Generate workspace >>> ${name} <<<`
    ));
    if (!this.folderDoesNotExist.exec(name)) return;
    if (!this.createFolder.exec(name)) return;
    if (!this.goInto.exec(name)) return;
    if (!this.runCommand.exec("git init")) return;
    if (!this.runCommand.exec("npm init -y")) return;
    if (!this.runCommand.exec("npm install typescript --save-dev")) return;
    if (!this.runCommand.exec("npm install jest --save-dev")) return;
    if (!this.runCommand.exec("tsc --init")) return;
    if (!this.createFolder.exec("projects")) return;
    if (!this.createFolder.exec("projects/apps")) return;
    if (!this.createFile.exec("projects/apps/.gitkeep")) return;
    if (!this.createFolder.exec("projects/libs")) return;
    if (!this.createFile.exec("projects/libs/.gitkeep")) return;
    if (!this.createFolder.exec("projects/tools")) return;
    if (!this.createFile.exec("projects/tools/.gitkeep")) return;
    if (!this.createFile.exec(config)) return;
    if (!this.createFile.exec(".gitignore")) return;
    if (!this.goInto.exec("..")) return;
  }
}
