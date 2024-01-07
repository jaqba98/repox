import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {RegenerateWorkspaceCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {CheckForceModeAppService, GoToWorkspaceRootAppService} from "@lib/program-step";
import {GenerateWorkspaceAppService} from "../app-service/generate-workspace-app.service";

@singleton()
/**
 * The program steps service is responsible for executing the step list to regenerate workspace.
 */
export class RegenerateWorkspaceStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly checkForceMode: CheckForceModeAppService,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootAppService,
        private readonly generateWorkspace: GenerateWorkspaceAppService
    ) {
    }

    runProgramSteps(_programModel: Record<string, never>, commandModel: RegenerateWorkspaceCommandModel): void {
        this.simpleMessage.writeInfo("Regenerate Workspace", REPOX_LOGO);
        this.newline.writeNewline();
        const {isForceMode} = commandModel;
        if (!this.checkForceMode.run(isForceMode)) return;
        if (!this.goToWorkspaceRoot.run()) return;
        if (!this.generateWorkspace.run()) return;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
    }
}

// todo: done