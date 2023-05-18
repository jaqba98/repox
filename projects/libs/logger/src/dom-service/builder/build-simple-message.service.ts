import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { singleton } from "tsyringe";
import { BuildMessageService } from "./build-message.service";
import { LoggerDomainModel } from "../../model/logger-domain.model";

@singleton()
/**
 * The service is responsible for building the simple message.
 */
export class BuildSimpleMessageService {
  constructor(private readonly buildMessage: BuildMessageService) {
  }

  build(
    message: string,
    mode: LoggerModeEnum,
    isLogo: boolean,
    isHeader: boolean,
    headerContent: string,
    newline: number
  ): string {
    return this.buildMessage.build({
      lines: [{
        message: [{ value: message, underscore: false }],
        mode,
        isLogo,
        isHeader,
        headerContent,
        newline
      }]
    });
  }
}
