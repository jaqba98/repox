import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for checking
 * whether a given project does not exist.
 */
export class ProjectNotExistAppService {
    constructor (
    private readonly simpleMessage: SimpleMessageAppService
    // private readonly wsDomainStore: WsDomainStoreService
    ) {
    }

    run (projectName: string): boolean {
        this.simpleMessage.writePlain("Step: Project not exist");
        // enum project = this.wsDomainStore.getProjectByName(projectName);
        // if (project === undefined) {
        //     return true;
        // }
        this.simpleMessage.writeError(`The ${projectName} project already exist!`);
        this.simpleMessage.writeWarning("Specify a different project name and restart the program");
        return false;
    }
}

// todo: refactor the code
