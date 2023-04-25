import { singleton } from "tsyringe";
import { WriteLogService } from "../writer/write-log.service";
import { ExecCommandService } from "./exec-command.service";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder.service";

@singleton()
/**
 * The service is responsible for verify whether folder by name
 * not exists.
 */
export class ExecFolderDoesNotExistService {
  constructor(
    private readonly writeLog: WriteLogService,
    private readonly execCommand: ExecCommandService
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
