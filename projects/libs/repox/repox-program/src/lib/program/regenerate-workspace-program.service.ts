import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";
import {ParamDomainStore} from "@lib/param-domain";
import {
    RunCommandAppService,
    SystemProgramEnum,
    SystemProgramExistAppService
} from "@lib/program-step";
import {
    RegenerateWorkspaceAppService
} from "../app-service/regenerate-workspace-app.service";

@singleton()
/**
 * The start point of the program regenerate, command workspace.
 * Possible arguments
 */
export class RegenerateWorkspaceProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly store: ParamDomainStore,
        private readonly systemProgramExist: SystemProgramExistAppService,
        private readonly regenerateWorkspace: RegenerateWorkspaceAppService,
        private readonly runCommand: RunCommandAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Regenerate Workspace", REPOX_LOGO);
        this.newline.writeNewline();
        const forceMode = this.store.getCommandArg("force", "f");
        if (!forceMode) {
            this.simpleMessage.writeError("The program must be run in forced mode!");
            this.simpleMessage.writeWarning("Specify force mode by --force or -f and rerun the program.");
            return false;
        }
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        if (!this.runCommand.run("npm i -g pnpm")) return false;
        if (!this.regenerateWorkspace.run()) return false;
        if (!this.runCommand.run("pnpm install --prefer-offline")) return false;
        if (!this.runCommand.run("git init")) return false;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
