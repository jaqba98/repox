import {singleton} from "tsyringe";
import {type ProgramModel} from "@lib/model";
import {BuildProjectStepService} from "../step/build-project-step.service";
import {type BuildProjectRepoxCommandModel, EmptyRepoxProgramModel} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program build project.
 */
export class BuildProjectProgramService implements ProgramModel {
    constructor(private readonly step: BuildProjectStepService) {
    }

    run(programDomain: unknown, commandDomain: unknown): void {
        this.step.runSteps(
            programDomain as EmptyRepoxProgramModel,
            commandDomain as BuildProjectRepoxCommandModel
        );
    }
}
