import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
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
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(folderPath: string): boolean {
        this.stepMessage.write(folderNotExistMsg(folderPath));
        if (pathNotExist(folderPath)) return true;
        this.simpleMessage.writeError(folderAlreadyExistMsg(folderPath));
        this.simpleMessage.writeWarning(specifyDifferentMsg("folder name"));
        return false;
    }
}
