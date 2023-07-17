import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";
import { FolderUtilsService, PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for generate project structure
 * of files and folders.
 */
export class CreateProjectStructureAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService,
    private readonly pathUtils: PathUtilsService,
    private readonly folderUtils: FolderUtilsService
  ) {
  }

  run(projectName: string): boolean {
    this.simpleMessage.writePlain(
      `Creating a project workspace structure`
    );
    const project = this.wsDomainStore.getProject(projectName);
    if (!project) {
      this.simpleMessage.writeError(
        `Project ${projectName} does not exist in the store!`
      );
      return false;
    }
    const currentPath = this.pathUtils.getCurrentPath();
    this.folderUtils.createFolder(project.path);
    return true;
  }
}
