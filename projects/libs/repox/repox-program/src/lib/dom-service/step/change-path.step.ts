import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {changePath, pathExist} from "@lib/utils";

import {changePathStepMsg} from "../../const/message/step-message.const";
import {failedToChangePathErrorMsg,} from "../../const/message/error-message.const";
import {pathNotExistWarningMsg} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for changing the path.
 */
export class ChangePathStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(path: string): boolean {
        this.stepMessage.write(changePathStepMsg(path));
        if (pathExist(path)) {
            changePath(path);
            return true;
        }
        this.complexMessage.writeError([
            failedToChangePathErrorMsg(path)
        ]);
        this.complexMessage.writeWarning([
            pathNotExistWarningMsg(path)
        ]);
        return false;
    }
}
