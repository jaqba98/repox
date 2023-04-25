import { singleton } from "tsyringe";
import {
  BaseFieldModel,
  EmptyArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";
import {
  WriteLogService
} from "../../infra/service/writer/write-log.service";
import {
  msgRunCommandInfo
} from "../../infra/service/builder/message/info-msg-builder.service";
import {
  ExecFolderDoesNotExistService
} from "../../infra/service/exec/exec-folder-does-not-exist.service";
import {
  buildInfoMsg,
  newline
} from "../../infra/service/builder/message/base-msg-builder.service";
import {
  ExecProgramInstalledService
} from "../../infra/service/exec/exec-program-installed.service";
import {
  ExecCreateFolderService
} from "../../infra/service/exec/exec-create-folder.service";
import {
  ExecGoIntoService
} from "../../infra/service/exec/exec-go-into.service";
import {
  ExecRunCommandService
} from "../../infra/service/exec/exec-run-command.service";
import {
  ExecCreateFileService
} from "../../infra/service/exec/exec-create-file.service";
import {
  RepoxConfigFileEnum
} from "../../infra/enum/repox-config-file.enum";

@singleton()
/**
 * The service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly writeLog: WriteLogService,
    private readonly folderDoesNotExist: ExecFolderDoesNotExistService,
    private readonly gitInstalled: ExecProgramInstalledService,
    private readonly createFolder: ExecCreateFolderService,
    private readonly goInto: ExecGoIntoService,
    private readonly runCommand: ExecRunCommandService,
    private readonly createFile: ExecCreateFileService
  ) {
  }

  run(
    programArgs: EmptyArgsModel,
    commandArgs: ProgramGenerateCommandWorkspaceArgsModel
  ): void {
    this.writeLog.message(msgRunCommandInfo("generate workspace"));
    this.writeLog.message(newline());

    this.writeLog.message(buildInfoMsg("System verification"));
    const git = this.gitInstalled.exec("git");
    if (!git) return;
    const node = this.gitInstalled.exec("node");
    if (!node) return;
    const npm = this.gitInstalled.exec("npm");
    if (!npm) return;
    this.writeLog.message(newline());

    const names: Array<string> = commandArgs.name.values;
    const config: string = this.getConfiguration(commandArgs.config);
    names.forEach(name => {
      this.generateWorkspace(name, config);
      this.writeLog.message(newline());
    });
  }

  private generateWorkspace(name: string, config: string): void {
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

  private getConfiguration(
    config: BaseFieldModel
  ): RepoxConfigFileEnum {
    const configType = config.hasValue ? config.values[0] : "json";
    switch (configType) {
      case "json":
        return RepoxConfigFileEnum.repoxJson;
      case "js":
        return RepoxConfigFileEnum.repoxJs;
      case "ts":
        return RepoxConfigFileEnum.repoxTs;
      default:
        return RepoxConfigFileEnum.repoxJson;
    }
  }
}
