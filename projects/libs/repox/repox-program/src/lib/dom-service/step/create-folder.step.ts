import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
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
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write(createFolderMsg(folderPath));
        if (pathNotExist(folderPath)) {
            createFolder(folderPath);
            return true;
        }
        this.complexMessage.writeError([
            folderAlreadyExistMsg(folderPath)
        ]);
        this.complexMessage.writeWarning([
            specifyDifferentMsg("folder name")
        ]);
        return false;
    }
}
