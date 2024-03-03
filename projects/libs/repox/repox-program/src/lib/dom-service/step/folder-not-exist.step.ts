import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {pathNotExist} from "@lib/utils";

import {folderNotExistMsg} from "../../const/message/step-message.const";
import {folderAlreadyExistMsg} from "../../const/message/error-message.enum";
import {specifyDifferentMsg} from "../../const/message/warning-message.const";

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
        this.stepMessage.write(folderNotExistMsg(folderPath));
        if (pathNotExist(folderPath)) return true;
        this.complexMessage.writeError([
            folderAlreadyExistMsg(folderPath)
        ]);
        this.complexMessage.writeWarning([
            specifyDifferentMsg("folder name")
        ]);
        return false;
    }
}
