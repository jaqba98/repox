import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";

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
    this.simpleMessage.writePlain(
      `Check that project ${projectName} exist`
    );
    const project = this.wsDomainStore.getProjectBeName(projectName);
    if (project === undefined) {
      this.simpleMessage.writeError(
        `The ${projectName} project does not exist!`
      );
      this.simpleMessage.writeWarning(
        `Specify a different project name and restart the program`
      );
      return false;
    }
    return true;
  }
}
