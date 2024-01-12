import {singleton} from "tsyringe";

import {ProgramModel} from "@lib/model";
import {RegenerateWorkspaceStepService} from "../step/regenerate-workspace-step.service";
import {RegenerateWorkspaceCommandModel} from "@lib/repox-domain";

@singleton()
/**
 * The program is responsible for regenerating the existing project workspace.
 */
export class RegenerateWorkspaceProgramService implements ProgramModel {
    constructor(private readonly step: RegenerateWorkspaceStepService) {
    }

    runProgram(programModel: unknown, commandModel: unknown): void {
        this.step.runProgramSteps(
            programModel as Record<string, never>,
            commandModel as RegenerateWorkspaceCommandModel
        );
    }
}

