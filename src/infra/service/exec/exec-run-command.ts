import { singleton } from "tsyringe";
import { WriteLog } from "../writer/write-log";
import { ExecCommand } from "./exec-command";
import { buildInfoMsg } from "../builder/message/base-msg-builder";

/**
 * The service is responsible for run bash command.
 */
@singleton()
export class ExecRunCommand {
  constructor(
    private readonly writeLog: WriteLog,
    private readonly execCommand: ExecCommand
  ) {
  }

  exec(command: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Run the >>> ${command} <<< command`
    ));
    this.execCommand.exec(command);
    return true;
  }
}
