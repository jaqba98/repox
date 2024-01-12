import {singleton} from "tsyringe";

import {ProgramModel} from "@lib/model";
import {GenerateWorkspaceStepService} from "../step/generate-workspace-step.service";
import {GenerateWorkspaceCommandModel} from "@lib/repox-domain";

@singleton()
/**
 * The program is responsible for generating the project workspace in the given path.
 */
export class GenerateWorkspaceProgramService implements ProgramModel {
    constructor(private readonly step: GenerateWorkspaceStepService) {
    }

    runProgram(programModel: unknown, commandModel: unknown): void {
        this.step.runProgramSteps(
            programModel as Record<string, never>,
            commandModel as GenerateWorkspaceCommandModel
        );
    }
}

