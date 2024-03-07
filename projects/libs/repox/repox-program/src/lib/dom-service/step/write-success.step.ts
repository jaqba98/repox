import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";

import {
    commandExecutedCorrectlySuccessMsg
} from "../../const/message/success-message.enum";

@singleton()
/**
 * The step service is responsible for writing success on the console screen.
 */
export class WriteSuccessStep {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    run(): boolean {
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess(commandExecutedCorrectlySuccessMsg());
        return true;
    }
}
