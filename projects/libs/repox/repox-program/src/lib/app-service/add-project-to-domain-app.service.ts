import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildProjectAliasService,
  BuildProjectPathService,
  type ProjectSchemeEnum,
  type ProjectTypeEnum,
  WsDomainStoreService
} from "@lib/repox-workspace";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for add new project
 * to the domain model.
 */
export class AddProjectToDomainAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly buildProjectPath: BuildProjectPathService,
    private readonly pathUtils: PathUtilsService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run (
    projectName: string, projectType: string, projectPath: string,
    projectScheme: string
  ): boolean {
    this.simpleMessage.writePlain(`Add project to domain`);
    // Prepare data
    const name = projectName;
    const type = projectType as ProjectTypeEnum;
    const path = this.buildProjectPath.buildPath(
      projectName, projectType, projectPath
    );
    const scheme = projectScheme as ProjectSchemeEnum;
    // Add project to the domain store
    this.wsDomainStore.addProject(name, type, path, scheme);
    return true;
  }
}
