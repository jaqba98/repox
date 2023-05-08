import { WriteLog } from "../writer/write-log";
import { singleton } from "tsyringe";
import { ExecCommand } from "./exec-command";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder";

/**
 * The service is responsible for verify whether folder by name
 * not exists.
 */
@singleton()
export class ExecFolderDoesNotExist {
  constructor(
    private readonly writeLog: WriteLog,
    private readonly execCommand: ExecCommand
  ) {
  }

  exec(name: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Verify that the >>> ${name} <<< folder exists`
    ));
    if (this.execCommand.pathExist(name)) {
      this.writeLog.message(
        buildErrMsg(`The folder already exists!`)
      );
      return false;
    }
    return true;
  }
}
