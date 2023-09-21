import {singleton} from "tsyringe";
import {ProgramModel} from "@lib/model";
import {DefaultDefaultRepoxProgramModel, EmptyRepoxCommandModel} from "@lib/repox-domain";
import {DefaultDefaultStepService} from "../step/default-default-step.service";

@singleton()
/**
 * The start point of the program default, command default.
 */
export class DefaultDefaultProgramService implements ProgramModel {
    constructor(private readonly step: DefaultDefaultStepService) {
    }

    run(programDomain: unknown, commandDomain: unknown): void {
        this.step.runSteps(
            programDomain as DefaultDefaultRepoxProgramModel,
            commandDomain as EmptyRepoxCommandModel
        );
    }
}
