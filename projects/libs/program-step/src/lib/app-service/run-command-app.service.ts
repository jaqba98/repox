import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {RunCommandUtilsService} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for
 * run command in shell.
 */
export class RunCommandAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly runCommandUtils: RunCommandUtilsService
    ) {
    }

    run(command: string): boolean {
        this.simpleMessage.writePlain(`Step: Run Command >>> ${command}`);
        this.runCommandUtils.runCommand(command);
        return true;
    }
}

// todo: refactor the code
