import { singleton } from "tsyringe";
import { BuildMessageService } from "./build-message.service";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { LoggerHeaderEnum } from "../../enum/logger-header.enum";

@singleton()
/**
 * The service is responsible for building the simple message.
 */
export class BuildSimpleMessageService {
  constructor(private readonly buildMessage: BuildMessageService) {
  }

  // todo: tu skończyłem
  buildSuccessMessage(message: string, logo: string): string {
    return this.buildMessage.build({
      lines: [{
        mode: LoggerModeEnum.success,
        logo: {
          visible: true,
          content: logo
        },
        header: {
          visible: true,
          content: LoggerHeaderEnum.success
        },
        words: [{ content: message, underscore: false }],
      }]
    });
  }

  // build(
  //   message: string,
  //   mode: LoggerModeEnum,
  //   isLogo: boolean,
  //   isHeader: boolean,
  //   headerContent: string,
  //   newline: number
  // ): string {
  //   return this.buildMessage.build({
  //     lines: [{
  //       message: [{ value: message, underscore: false }],
  //       mode,
  //       isLogo,
  //       isHeader,
  //       headerContent,
  //       newline
  //     }]
  //   });
  // }
}

// todo: refactor
