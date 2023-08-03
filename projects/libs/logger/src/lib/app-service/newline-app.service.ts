import { singleton } from "tsyringe";
import {
  WriteMessageService
} from "../infrastructure/write-message.service";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The app service is responsible for displaying newline message
 * on the console screen.
 */
export class NewlineAppService {
  constructor (private readonly writeMessage: WriteMessageService) {
  }

  writeNewline (): void {
    this.writeMessage.write(EMPTY_STRING);
  }
}
