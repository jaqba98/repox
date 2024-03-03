import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {pathNotExist} from "@lib/utils";

import {folderNotExistStepMsg} from "../../const/message/step-message.const";
import {folderAlreadyExistErrorMsg} from "../../const/message/error-message.enum";
import {
    specifiedFolderThatExistOnDiskWarningMsg,
    specifyDifferentFolderNameWarningMsg
} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for checking whether folder not exist.
 */
export class FolderNotExistStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write(folderNotExistStepMsg(folderPath));
        if (pathNotExist(folderPath)) return true;
        this.complexMessage.writeError([
            folderAlreadyExistErrorMsg(folderPath)
        ]);
        this.complexMessage.writeWarning([
            specifiedFolderThatExistOnDiskWarningMsg(),
            specifyDifferentFolderNameWarningMsg()
        ]);
        return false;
    }
}
