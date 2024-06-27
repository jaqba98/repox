import { singleton } from "tsyringe";

import { WriteMessageService } from "../infrastructure/write-message.service";
import { buildNewLine } from "../builder/build-message-piece.service";

@singleton()
export class NewlineAppService {
  constructor(private readonly writeMessage: WriteMessageService) {
  }

  writeNewLine() {
    this.writeMessage.write(buildNewLine(1));
  }
}
