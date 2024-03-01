import {singleton} from "tsyringe";

import {WriteVersionAppService} from "@lib/program-step";
import {ParamDomainStore} from "@lib/param-domain";
import {REPOX_VERSION} from "@lib/repox-const";

@singleton()
/**
 * The start point of the program unknown, command unknown.
 * Possible arguments
 * --version or -v, display the current version
 */
export class UnknownUnknownAppService {
    constructor(
        private readonly store: ParamDomainStore,
        private readonly writeVersion: WriteVersionAppService
    ) {
    }

    runProgram(): boolean {
        if (this.store.hasProgramArg("version") || this.store.hasProgramArg("v")) {
            this.writeVersion.write(REPOX_VERSION);
        }
        return true;
    }
}
