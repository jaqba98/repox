import { singleton } from "tsyringe";
import { WriteLog } from "../writer/write-log";
import { ExecCommand } from "./exec-command";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder";

/**
 * The service is responsible for create folder by name.
 */
@singleton()
export class ExecCreateFolder {
  constructor(
    private readonly writeLog: WriteLog,
    private readonly execCommand: ExecCommand
  ) {
  }

  exec(name: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Create the >>> ${name} <<< folder`
    ));
    if (this.execCommand.pathExist(name)) {
      this.writeLog.message(
        buildErrMsg(`The folder already exists!`)
      );
      return false;
    }
    this.execCommand.createFolder(name);
    return true;
  }
}
