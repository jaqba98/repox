import {singleton} from "tsyringe";
import {type ProgramModel} from "@lib/model";
import type {EmptyRepoxProgramModel, LintProjectRepoxCommandModel} from "@lib/repox-domain";
import {LintProjectStepService} from "./lint-project-step.service";

@singleton()
/**
 * The start point of the program lint project.
 */
export class LintProjectProgramService implements ProgramModel {
    constructor(private readonly step: LintProjectStepService) {
    }

    runProgram(programDomain: unknown, commandDomain: unknown): void {
        this.step.runSteps(
            programDomain as EmptyRepoxProgramModel,
            commandDomain as LintProjectRepoxCommandModel
        );
    }
}

// todo: refactor the code
