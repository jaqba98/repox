import { singleton } from "tsyringe";
import { LoggerMessageAppService, LoggerModeEnum } from "@lib/logger";
import { SYSTEM_VERSION } from "@lib/domain";

@singleton()
/**
 * The app service is responsible for display current version.
 */
export class GetProgramVersionAppService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(): void {
    this.loggerMessageApp.write({
      message: SYSTEM_VERSION,
      mode: LoggerModeEnum.info,
      isLogo: false,
      isHeader: true,
      headerContent: "VERSION",
      newline: 0
    });
  }
}
