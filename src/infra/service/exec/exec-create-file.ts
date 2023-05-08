import { singleton } from "tsyringe";
import { WriteLog } from "../writer/write-log";
import { ExecCommand } from "./exec-command";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder";
import {
  BuildEmptyConfigFile
} from "../builder/config/build-empty-config-file";
import { WriteFile } from "../writer/write-file";
import {
  RepoxConfigModel
} from "../../../model/config/repox-config-model";

/**
 * The service is responsible for create file by name.
 */
@singleton()
export class ExecCreateFile {
  constructor(
    private readonly writeLog: WriteLog,
    private readonly execCommand: ExecCommand,
    private readonly buildEmptyConfigFile: BuildEmptyConfigFile,
    private readonly writeFile: WriteFile
  ) {
  }

  exec(fileName: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Create the >>> ${fileName} <<< file`
    ));
    if (this.execCommand.pathExist(fileName)) {
      this.writeLog.message(
        buildErrMsg(`The file already exists!`)
      );
      return false;
    }
    this.execCommand.createFile(fileName);
    this.writeFile.writeJsonFile<RepoxConfigModel>(
      fileName,
      this.buildEmptyConfigFile.buildConfigFile()
    );
    return true;
  }
}
