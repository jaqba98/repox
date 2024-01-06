import {singleton} from "tsyringe";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    generate(): boolean {
        // todo: I am here
        return true;
    }
}
