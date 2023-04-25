import { singleton } from "tsyringe";
import { WriteLogService } from "../writer/write-log.service";
import {
  buildErrMsg,
  buildInfoMsg
} from "../builder/message/base-msg-builder.service";
import { sync } from "command-exists";

@singleton()
/**
 * The service is responsible for verify whether program
 * is installed.
 */
export class ExecProgramInstalledService {
  constructor(
    private readonly writeLog: WriteLogService
  ) {
  }

  exec(program: string): boolean {
    this.writeLog.message(buildInfoMsg(
      `Verify that the ${program} is installed`
    ));
    if (!sync(program)) {
      this.writeLog.message(
        buildErrMsg(`The ${program} is not installed`)
      );
      return false;
    }
    return true;
  }
}
