import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for checking
 * whether a given project does not exist.
 */
export class ProjectNotExistAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run(projectName: string): boolean {
    this.simpleMessage.writePlain(
      `Check that project ${projectName} does not exist`
    );
    const project = this.wsDomainStore.getProjectBeName(projectName);
    if (project === undefined) {
      return true;
    }
    this.simpleMessage.writeError(
      `The ${projectName} project already exist!`
    );
    this.simpleMessage.writeWarning(
      `Specify a different project name and restart the program`
    );
    return false;
  }
}
