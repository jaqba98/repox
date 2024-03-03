import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {pathNotExist} from "@lib/utils";

import {folderNotExist} from "../../const/message/step-message.const";
import {folderAlreadyExist} from "../../const/message/error-message.enum";
import {specifyDifferent} from "../../const/message/warning-message.const";

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
        this.stepMessage.write(folderNotExist(folderPath));
        if (pathNotExist(folderPath)) return true;
        this.simpleMessage.writeError(folderAlreadyExist(folderPath));
        this.simpleMessage.writeWarning(specifyDifferent("folder name"));
        return false;
    }
}
