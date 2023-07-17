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
    name: string, type: string, path: string, scheme: string
  ): boolean {
    this.simpleMessage.writePlain("Add project to domain");
    const projectType = <ProjectTypeEnum>type;
    const projectPath = this.buildProjectPath.buildPath(
      name, projectType, path
    );
    const projectScheme = <ProjectSchemeEnum>scheme;
    this.wsDomainStore.addProject(
      name, projectType, projectPath, projectScheme
    );
    return true;
  }
}
