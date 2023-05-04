import { singleton } from "tsyringe";
import { WriteLogService } from "../writer/write-log.service";
import { ExecCommand } from "./exec-command";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder.service";

@singleton()
/**
 * The service is responsible for create file by name.
 */
export class ExecCreateFileService {
  constructor(
    private readonly writeLog: WriteLogService,
    private readonly execCommand: ExecCommand
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
    return true;
  }
}
