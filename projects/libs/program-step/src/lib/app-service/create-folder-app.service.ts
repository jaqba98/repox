import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {createFolder} from "@lib/utils";

@singleton()
/**
 * This app service is responsible for creating the folder.
 */
export class CreateFolderAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write("Create the folder");
        if (createFolder(folderPath)) return true;
        this.simpleMessage.writeError(`Failed to create folder ${folderPath} !`);
        return false;
    }
}

// todo: done