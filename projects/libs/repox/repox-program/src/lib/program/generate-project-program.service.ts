import {singleton} from "tsyringe";

import {ProgramModel} from "@lib/model";
import {GenerateProjectStepService} from "../step/generate-project-step.service";
import {GenerateProjectCommandModel} from "@lib/repox-domain";

@singleton()
/**
 * The program is responsible for generating the project in the workspace.
 */
export class GenerateProjectProgramService implements ProgramModel {
    constructor(private readonly step: GenerateProjectStepService) {
    }

    runProgram(programDomain: unknown, commandDomain: unknown): void {
        this.step.runProgramSteps(
            programDomain as Record<string, never>,
            commandDomain as GenerateProjectCommandModel
        );
    }
}

// todo: done