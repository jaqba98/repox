import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {changePath, findWorkspacePath, getCurrentPath} from "@lib/utils";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * This app service is responsible for navigating to the root workspace path.
 */
export class GoToWorkspaceRootAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Go to workspace root");
        const currentPath = getCurrentPath();
        const workspacePath = findWorkspacePath(currentPath);
        if (workspacePath === EMPTY_STRING) {
            this.simpleMessage.writeError("Workspace root path not found!");
            this.simpleMessage.writeError("The command must be run in the workspace!");
            this.simpleMessage.writeWarning("Rerun the command in the correct workspace directory.");
            return false;
        }
        changePath(workspacePath);
        return true;
    }
}

// todo: done