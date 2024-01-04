import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {changePath, pathExist} from "@lib/utils";

@singleton()
/**
 * This app service is responsible for changing the current path to the destination path.
 */
export class ChangePathAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(path: string): boolean {
        this.stepMessage.write("Change path");
        if (pathExist(path)) {
            changePath(path);
            return true;
        }
        this.simpleMessage.writeError(`The path ${path} does not exist!`);
        return false;
    }
}

// todo: done