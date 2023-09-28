import {singleton} from "tsyringe";
import {BuildSimpleMessageService} from "../dom-service/builder/build-simple-message.service";
import {WriteMessageService} from "../infrastructure/write-message.service";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The app service is responsible for displaying simple message
 * on the console screen.
 */
export class SimpleMessageAppService {
    constructor(
        private readonly buildSimpleMessage: BuildSimpleMessageService,
        private readonly writeMessage: WriteMessageService
    ) {
    }

    writeSuccess(message: string, logo: string = EMPTY_STRING): void {
        const outputMessage = this.buildSimpleMessage.buildSuccess(message, logo);
        this.writeMessage.write(outputMessage);
    }

    writeError(message: string, logo: string = EMPTY_STRING): void {
        const outputMessage = this.buildSimpleMessage.buildError(message, logo);
        this.writeMessage.write(outputMessage);
    }

    writeWarning(message: string, logo: string = EMPTY_STRING): void {
        const outputMessage = this.buildSimpleMessage.buildWarning(message, logo);
        this.writeMessage.write(outputMessage);
    }

    writeInfo(message: string, logo: string = EMPTY_STRING): void {
        const outputMessage = this.buildSimpleMessage.buildInfo(message, logo);
        this.writeMessage.write(outputMessage);
    }

    writePlain(message: string): void {
        const outputMessage = this.buildSimpleMessage.buildPlain(message);
        this.writeMessage.write(outputMessage);
    }
}
