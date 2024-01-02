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

    runProgram(programDomain: unknown, commandDomain: unknown): void {
        this.step.runProgramSteps(
            programDomain as Record<string, never>,
            commandDomain as GenerateWorkspaceCommandModel
        );
    }
}

// todo: done