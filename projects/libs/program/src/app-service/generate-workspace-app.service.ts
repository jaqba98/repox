import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/parameter";
import {
  GenerateWorkspaceModel
} from "../model/program/program-property.model";
import {
  BuildProgramModelService
} from "../dom-service/builder/build-program-model.service";

@singleton()
/**
 * The program service is responsible for run program
 * generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly buildProgramModel: BuildProgramModelService,
    // private readonly writeLog: LoggerService,
    // private readonly programInstalled: ExecProgramInstalled,
    // private readonly runCommand: ExecRunCommand,
    // private readonly createFolder: ExecCreateFolder,
    // private readonly createFile: ExecCreateFile,
    // private readonly goInto: ExecGoInto,
    // private readonly isRepoxWs: ExecIsRepoxWs,
    // private readonly folderDoesNotExist: ExecFolderDoesNotExist,
    // private readonly getConfigFileName: GetConfigFileName
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateWorkspaceModel = this.buildProgramModel
      .buildGenerateWorkspaceModel(paramDomain);
    // this.writeLog.write(msgRunCommandInfo("generate workspace"));
    // this.writeLog.write(newline());
    // this.writeLog.write(buildInfoMsg("System verification"));
    // const git = this.programInstalled.exec("git");
    // if (!git) return;
    // const node = this.programInstalled.exec("node");
    // if (!node) return;
    // const npm = this.programInstalled.exec("npm");
    // if (!npm) return;
    // this.writeLog.write(newline());
    // const config = this.getConfigFileName.getConfig(model.config);
    // this.generateWorkspace(model.name, config);
    // this.writeLog.write(newline());
  }

  private generateWorkspace(name: string): void {
    // this.writeLog.write(buildInfoMsg(
    //   `Generate workspace >>> ${name} <<<`
    // ));
    // if (!this.folderDoesNotExist.exec(name)) return;
    // if (!this.isRepoxWs.exec(name)) return;
    // if (!this.createFolder.exec(name)) return;
    // if (!this.goInto.exec(name)) return;
    // if (!this.runCommand.exec("git init")) return;
    // if (!this.runCommand.exec("npm init -y")) return;
    // if (!this.runCommand.exec("npm install typescript --save-dev")) return;
    // if (!this.runCommand.exec("npm install jest --save-dev")) return;
    // if (!this.runCommand.exec("tsc --init")) return;
    // if (!this.createFolder.exec("projects")) return;
    // if (!this.createFolder.exec("projects/apps")) return;
    // if (!this.createFile.exec("projects/apps/.gitkeep")) return;
    // if (!this.createFolder.exec("projects/libs")) return;
    // if (!this.createFile.exec("projects/libs/.gitkeep")) return;
    // if (!this.createFolder.exec("projects/tools")) return;
    // if (!this.createFile.exec("projects/tools/.gitkeep")) return;
    // if (!this.createFile.exec(config)) return;
    // if (!this.createFile.exec(".gitignore")) return;
    // if (!this.goInto.exec("..")) return;
  }
}
// todo: refactor