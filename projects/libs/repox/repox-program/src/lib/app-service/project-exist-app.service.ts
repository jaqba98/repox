import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {WsDomainStoreService} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for checking
 * whether a given project not exist.
 */
export class ProjectExistAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDomainStore: WsDomainStoreService
    ) {
    }

  run(projectName: string): boolean {
    this.simpleMessage.writePlain(`Step: Project exist`);
    const project = this.wsDomainStore.getProjectByName(projectName);
    if (project === undefined) {
      return false;
    }
    this.simpleMessage.writeError(`The ${projectName} project not exist!`);
    this.simpleMessage.writeWarning(`Specify a different project name and restart the program`);
    return false;
  }
}
