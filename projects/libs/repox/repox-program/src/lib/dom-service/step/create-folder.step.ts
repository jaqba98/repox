import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {createFolder, pathNotExist} from "@lib/utils";

import {createFolderMsg} from "../../const/message/step-message.const";
import {folderAlreadyExistMsg} from "../../const/message/error-message.enum";
import {specifyDifferentMsg} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for creating a folder.
 */
export class CreateFolderStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write(createFolderMsg(folderPath));
        if (pathNotExist(folderPath)) {
            createFolder(folderPath);
            return true;
        }
        this.simpleMessage.writeError(folderAlreadyExistMsg(folderPath));
        this.simpleMessage.writeWarning(specifyDifferentMsg("folder name"));
        return false;
    }
}
