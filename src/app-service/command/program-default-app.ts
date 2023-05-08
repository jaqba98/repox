import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  BuildCommandModel
} from "../../dom-service/builder/build-command-model";
import {
  ProgramDefaultModel
} from "../../model/command/program-default-model";
import { WriteLog } from "../../infra/service/writer/write-log";
import {
  buildInfoMsg
} from "../../infra/service/builder/message/base-msg-builder";
import { SYSTEM_VERSION } from "../../const/domain.const";

/**
 * The command service is responsible for run command default.
 */
@singleton()
export class ProgramDefaultApp {
  constructor(
    private readonly buildCommandModel: BuildCommandModel,
    private readonly writeLog: WriteLog
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: ProgramDefaultModel = this.buildCommandModel
      .buildProgramDefaultModel(paramDomain);
    if (model.version) {
      this.writeLog.message(buildInfoMsg(SYSTEM_VERSION));
      return;
    }
  }
}
