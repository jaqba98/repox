import { singleton } from "tsyringe";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import {
  buildNewLine
} from "../dom-service/builder/build-message-piece.service";

@singleton()
/**
 * The app service is responsible for displaying newline message
 * on the console screen.
 */
export class NewlineAppService {
  constructor(private readonly writeMessage: WriteMessageService) {
  }

  writeNewline(quantity: number = 1): void {
    this.writeMessage.write(buildNewLine(quantity));
  }
}
