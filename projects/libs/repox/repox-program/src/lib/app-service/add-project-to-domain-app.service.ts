import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildProjectAliasService,
  BuildProjectPathService, ProjectSchemeEnum, ProjectTypeEnum,
  WsDomainStoreService
} from "@lib/repox-workspace";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for add new project to the domain.
 */
export class AddProjectToDomainAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly buildProjectPath: BuildProjectPathService,
    private readonly pathUtils: PathUtilsService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run(
    projectName: string, projectType: string, projectPath: string,
    projectScheme: string
  ): boolean {
    this.simpleMessage.writePlain("Add project to domain");
    const type = <ProjectTypeEnum>projectType;
    const path = this.buildProjectPath.buildPath(
      projectName, projectType, projectPath
    );
    const scheme = <ProjectSchemeEnum>projectScheme;
    this.wsDomainStore.addProject(projectName, type, path, scheme);
    return true;
  }
}
