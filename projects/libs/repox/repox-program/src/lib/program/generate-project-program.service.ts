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

    runProgram(programModel: unknown, commandModel: unknown): void {
        this.step.runProgramSteps(
            programModel as Record<string, never>,
            commandModel as GenerateProjectCommandModel
        );
    }
}

// todo: done