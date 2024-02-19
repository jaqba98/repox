import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";

@singleton()
/**
 * The app service is responsible for add new project
 * to the domain model.
 */
export class AddProjectToDomainAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        // private readonly buildProjectPath: BuildProjectPathService,
        // private readonly wsDomainStore: WsDomainStoreService
    ) {
    }

    run(_projectName: string, _projectType: string, _projectPath: string): boolean {
        this.simpleMessage.writePlain(`Step: Add Project to domain`);
        // Prepare data
        // const name = projectName;
        // const type = projectType as ProjectTypeEnum;
        // const path = this.buildProjectPath.buildPath(projectName, projectType, projectPath);
        // Add project to the domain store
        // this.wsDomainStore.addProject(name, type, path);
        return true;
    }
}

// todo: refactor the code
