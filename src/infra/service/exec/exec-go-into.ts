import { singleton } from "tsyringe";
import { WriteLog } from "../writer/write-log";
import { ExecCommand } from "./exec-command";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder";

/**
 * The service is responsible go into selected folder.
 */
@singleton()
export class ExecGoInto {
  constructor(
    private readonly writeLog: WriteLog,
    private readonly execCommand: ExecCommand
  ) {
  }

  exec(name: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Go into the >>> ${name} <<< folder`
    ));
    if (!this.execCommand.pathExist(name)) {
      this.writeLog.message(
        buildErrMsg(`The folder not exists!`)
      );
      return false;
    }
    this.execCommand.cd(name);
    return true;
  }
}
