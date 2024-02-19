import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";
import {ParamDomainStore} from "@lib/param-domain";

@singleton()
/**
 * The start point of the program regenerate, command workspace.
 * Possible arguments
 */
export class RegenerateWorkspaceProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly store: ParamDomainStore
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
        console.log(forceMode);
        return true;
    }
}

// todo: refactor the code