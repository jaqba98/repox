import { singleton } from "tsyringe";

import { EMPTY_STRING, StatusEnum } from "@lib/core";
import { BuildMessageService } from "./build-message.service";

@singleton()
export class BuildSimpleMessageService {
  constructor(private readonly buildMessage: BuildMessageService) {
  }

  build(
    logo: string,
    header: string,
    message: string,
    status: StatusEnum
  ): string {
    const logoVisible = logo !== EMPTY_STRING;
    const headerVisible = header !== EMPTY_STRING;
    const messageVisible = message !== EMPTY_STRING;
    return this.buildMessage.build({
      lines: [{
        status,
        logo: {
          visible: logoVisible,
          content: logo,
          underscore: false
        },
        header: {
          visible: headerVisible,
          content: header,
          underscore: false
        },
        words: [{
          visible: messageVisible,
          content: message,
          underscore: false
        }],
        newline: 0
      }]
    });
  }
}
