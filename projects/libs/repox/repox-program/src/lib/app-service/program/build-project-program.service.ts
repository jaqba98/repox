import {singleton} from "tsyringe";
import {type ProgramModel} from "@lib/model";
import {BuildProjectStepService} from "./build-project-step.service";
import {type BuildProjectRepoxCommandModel, EmptyRepoxProgramModel} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program build project.
 */
export class BuildProjectProgramService implements ProgramModel {
    constructor(private readonly step: BuildProjectStepService) {
    }

    runProgram(programDomain: unknown, commandDomain: unknown): void {
        this.step.runSteps(
            programDomain as EmptyRepoxProgramModel,
            commandDomain as BuildProjectRepoxCommandModel
        );
    }
}

// todo: refactor the code
