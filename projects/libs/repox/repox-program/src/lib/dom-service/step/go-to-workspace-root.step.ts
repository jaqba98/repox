import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {changePath, findWorkspacePath, getCurrentPath} from "@lib/utils";

import {goToWorkspaceRootStepMsg} from "../../const/message/step-message.const";
import {workspaceRootNotExistErrorMsg,} from "../../const/message/error-message.const";
import {
    navigateToExistingWorkspaceFolderWarningMsg
} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for going to the root workspace.
 */
export class GoToWorkspaceRootStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write(goToWorkspaceRootStepMsg());
        const currentPath = getCurrentPath();
        const workspacePath = findWorkspacePath(currentPath);
        if (workspacePath === "") {
            this.complexMessage.writeError([
                workspaceRootNotExistErrorMsg()
            ]);
            this.complexMessage.writeWarning([
                navigateToExistingWorkspaceFolderWarningMsg()
            ]);
            return false;
        }
        changePath(workspacePath);
        return true;
    }
}
