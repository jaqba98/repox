// done
import { singleton } from "tsyringe";

import { StepMessageAppService, ComplexMessageAppService } from "@lib/logger";
import { getCurrentPath, findWorkspacePath, changePath } from "@lib/utils";
import { EMPTY_STRING } from "@lib/const";

import { goToWorkspaceRootStepMsg } from "../../const/message/step-message.const";
import { workspaceRootNotExistErrorMsg } from "../../const/message/error-message.const";
import { navigateToTheExistingWorkspaceFolderWarningMsg } from "../../const/message/warning-message.const";

@singleton()
/**
 * The step dom-service is responsible for going to the root workspace.
 */
export class GoToWorkspaceRootStep {
    constructor (
        private readonly stepMessage: StepMessageAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {}

    run (): boolean {
        this.stepMessage.write(goToWorkspaceRootStepMsg());
        const currentPath = getCurrentPath();
        const workspaceRootPath = findWorkspacePath(currentPath);
        if (workspaceRootPath === EMPTY_STRING) {
            this.complexMessage.writeError([
                workspaceRootNotExistErrorMsg()
            ]);
            this.complexMessage.writeWarning([
                navigateToTheExistingWorkspaceFolderWarningMsg()
            ]);
            return false;
        }
        changePath(workspaceRootPath);
        return true;
    }
}
