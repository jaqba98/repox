import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {pathExist} from "@lib/utils";

@singleton()
/**
 * This app service is responsible for checking whether folders do not exist.
 */
export class FoldersNotExistAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(foldersPath: string[]): boolean {
        this.stepMessage.write("Check if the folders do not exist");
        const wrongFoldersPath = foldersPath
            .filter(folderPath => pathExist(folderPath));
        if (wrongFoldersPath.length === 0) return true;
        this.simpleMessage.writeError(`The ${wrongFoldersPath} folders already exists!`);
        this.simpleMessage.writeWarning("Specify a different folder names and restart the program.");
        return false;
    }
}
