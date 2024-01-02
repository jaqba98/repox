import {singleton} from "tsyringe";
import {ProgramModel} from "@lib/model";
import {
    RegenerateWorkspaceStepService
} from "../step/regenerate-workspace-step.service";
import {
    EmptyRepoxProgramModel,
    RegenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program regenerate workspace.
 * It regenerates workspace (each configuration files).
 */
export class RegenerateWorkspaceProgramService
    implements ProgramModel {
    constructor(private readonly step: RegenerateWorkspaceStepService) {
    }

    run(programDomain: unknown, commandDomain: unknown): void {
        this.step.runSteps(
            programDomain as EmptyRepoxProgramModel,
            commandDomain as RegenerateWorkspaceRepoxCommandModel
        );
    }
}
