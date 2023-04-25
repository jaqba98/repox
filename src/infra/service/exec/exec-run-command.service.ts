import { singleton } from "tsyringe";
import { WriteLogService } from "../writer/write-log.service";
import { ExecCommandService } from "./exec-command.service";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder.service";

@singleton()
/**
 * The service is responsible for run bash command.
 */
export class ExecRunCommandService {
  constructor(
    private readonly writeLog: WriteLogService,
    private readonly execCommand: ExecCommandService
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
