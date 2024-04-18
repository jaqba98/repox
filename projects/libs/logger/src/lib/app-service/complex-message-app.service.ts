import { singleton } from "tsyringe";

import {
    BuildSimpleMessageService
} from "../dom-service/builder/build-simple-message.service";
import { WriteMessageService } from "../infrastructure/write-message.service";

@singleton()
/**
 * The app service is responsible for displaying complex message
 * on the console screen.
 */
export class ComplexMessageAppService {
    constructor (
    private readonly buildSimpleMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
    ) {
    }

    writeError (messages: string[]): void {
        this.writeMessage.write("");
        for (const message of messages) {
            const outputMessage = this.buildSimpleMessage.buildError(message, "");
            this.writeMessage.write(outputMessage);
        }
    }

    writeWarning (messages: string[]): void {
        this.writeMessage.write("");
        for (const message of messages) {
            const outputMessage = this.buildSimpleMessage.buildWarning(message, "");
            this.writeMessage.write(outputMessage);
        }
    }
}
