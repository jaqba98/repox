import {singleton} from "tsyringe";

import {DisplayVersionAppService} from "@lib/program-step";
import {ParamDomainStore} from "@lib/param-domain";
import {REPOX_VERSION} from "@lib/repox-const";

@singleton()
/**
 * The start point of the program unknown, command unknown.
 * Possible arguments
 * - version or -v === display current repox version
 */
export class UnknownUnknownProgram {
    constructor(
        private readonly store: ParamDomainStore,
        private readonly displayVersion: DisplayVersionAppService
    ) {
    }

    runProgram(): boolean {
        const {programArgs} = this.store.get();
        if (!programArgs) return true;
        if (programArgs["version"]) {
            this.displayVersion.display(REPOX_VERSION);
            return true;
        }
        return true;
    }
}
