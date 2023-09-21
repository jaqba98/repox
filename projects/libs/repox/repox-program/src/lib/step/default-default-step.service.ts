import {singleton} from "tsyringe";
import {DisplayVersionAppService} from "@lib/program-step";
import {DefaultDefaultRepoxProgramModel, EmptyRepoxCommandModel} from "@lib/repox-domain";
import {REPOX_VERSION} from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
    constructor(
        private readonly displayVersion: DisplayVersionAppService
    ) {
    }

    runSteps(
        programModel: DefaultDefaultRepoxProgramModel,
        commandModel: EmptyRepoxCommandModel
    ): void {
        if (programModel.showVersion) {
            this.displayVersion.display(REPOX_VERSION);
        }
    }
}
