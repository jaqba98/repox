import {singleton} from "tsyringe";
import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {EMPTY_STRING} from "@lib/const";
import {RunGenerateService} from "../dom-service/service/run-generate.service";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    constructor(private readonly runGenerate: RunGenerateService) {
    }

    generate(): boolean {
        return this.runGenerate.run(WORKSPACE_STRUCTURE.structure, EMPTY_STRING);
    }
}

// todo: done