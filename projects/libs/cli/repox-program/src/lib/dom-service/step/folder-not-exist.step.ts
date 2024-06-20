// done
import { singleton } from "tsyringe";

import { StepMessageAppService, ComplexMessageAppService } from "@lib/logger";
import { pathNotExist } from "@lib/utils";

import { folderAlreadyExistErrorMsg } from "../../const/message/error-message.const";
import { folderNotExistStepMsg } from "../../const/message/step-message.const";
import { specifiedFolderThatExistOnDiskWarningMsg, specifyDifferentFolderNameWarningMsg } from "../../const/message/warning-message.const";

@singleton()
/**
 * The step dom-service is responsible for checking
 * whether the given folder does not exist.
 */
export class FolderNotExistStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run (folderPath: string): boolean {
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
