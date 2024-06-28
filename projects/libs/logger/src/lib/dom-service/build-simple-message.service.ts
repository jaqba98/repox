import { singleton } from "tsyringe";

import { EMPTY_STRING, StatusEnum } from "@lib/core";
import {
  BuildMessageService
} from "../builder/build-message.service";
import {
  DEFAULT_HEADER,
  ERROR_HEADER,
  INFO_HEADER,
  SUCCESS_HEADER,
  WARNING_HEADER
} from "../const/header.const";

@singleton()
export class BuildSimpleMessageService {
  constructor(private readonly buildMessage: BuildMessageService) {
  }

  buildSuccess(message: string) {
    return this.baseBuildMessage(
      SUCCESS_HEADER, message, StatusEnum.success
    );
  }

  buildWarning(message: string) {
    return this.baseBuildMessage(
      WARNING_HEADER, message, StatusEnum.warning
    );
  }

  buildError(message: string) {
    return this.baseBuildMessage(
      ERROR_HEADER, message, StatusEnum.error
    );
  }

  buildInfo(message: string) {
    return this.baseBuildMessage(
      INFO_HEADER, message, StatusEnum.info
    );
  }

  buildDefault(message: string) {
    return this.baseBuildMessage(
      DEFAULT_HEADER, message, StatusEnum.default
    );
  }

  private baseBuildMessage(
    header: string, message: string, status: StatusEnum
  ) {
    return this.buildMessage.build({
      lines: [{
        status,
        logo: {
          visible: false,
          content: EMPTY_STRING,
          underscore: false
        },
        header: {
          visible: true,
          content: header,
          underscore: false
        },
        words: [{
          visible: true,
          content: message,
          underscore: false
        }],
        newline: 0
      }]
    });
  }
}
