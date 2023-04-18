import { singleton } from "tsyringe";
import {
  BaseFieldModel
} from "../../../model/param-domain/param-domain.model";
import {
  msgCommandExecutedMessageInfo
} from "../builder/message/info-msg-builder.service";
import { WriteLogService } from "../writer/write-log.service";
import { SYSTEM_VERSION } from "../../../const/domain.const";

@singleton()
/**
 * The service is responsible for get current version of program.
 * */
export class ExecGetCurrentVersionService {
  constructor(
    private readonly writeLog: WriteLogService
  ) {
  }

  getCurrentVersion(
    version: BaseFieldModel,
    clean: BaseFieldModel
  ): void {
    if (!version.isDefined) {
      return;
    }
    clean.isDefined ?
      this.writeLog.message(SYSTEM_VERSION) :
      this.writeLog.message(
        msgCommandExecutedMessageInfo(SYSTEM_VERSION)
      );
  }
}
