import { singleton } from "tsyringe";
import { SYSTEM_VERSION } from "@lib/domain";
import { ParamDomainModel } from "@lib/parameter";
import {
  BuildProgramModelService
} from "../dom-service/builder/build-program-model.service";
import { LoggerMessageAppService } from "@lib/logger";
import {
  ProgramDefaultModel
} from "../model/program/program-property.model";
import {
  LoggerModeEnum
} from "../../../logger/src/enum/logger-mode.enum";

@singleton()
/**
 * The program service is responsible for run program default.
 */
export class ProgramDefaultAppService {
  constructor(
    private readonly buildCommandModel: BuildProgramModelService,
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: ProgramDefaultModel = this.buildCommandModel
      .buildProgramDefaultModel(paramDomain);
    if (model.version) {
      this.loggerMessageApp.write({
        message: SYSTEM_VERSION,
        mode: LoggerModeEnum.info,
        isLogo: false,
        isHeader: true,
        headerContent: "VERSION",
        newline: 0
      });
      return;
    }
  }
}
// todo: refactor