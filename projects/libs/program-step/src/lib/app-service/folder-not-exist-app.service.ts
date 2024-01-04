import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {pathNotExist} from "@lib/utils";

@singleton()
/**
 * This app service is responsible for checking whether the folder not exist.
 */
export class FolderNotExistAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write("Check if the folder does not exist");
        if (pathNotExist(folderPath)) return true;
        this.simpleMessage.writeError(`The ${folderPath} folder already exists!`);
        this.simpleMessage.writeWarning("Specify a different folder name and restart the program.");
        return false;
    }
}

// todo: done