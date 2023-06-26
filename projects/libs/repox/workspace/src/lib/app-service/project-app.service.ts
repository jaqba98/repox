import { singleton } from "tsyringe";
import { ProjectTypeEnum } from "../enum/project/project-type.enum";
import {
  ConvertProjectTypeService
} from "../dom-service/converter/convert-project-type.service";
import { EMPTY_STRING } from "@lib/const";
import { PathUtilsService } from "@lib/utils";
import {
  WorkspaceFolderEnum
} from "../enum/workspace/workspace-folder.enum";
import {
  BuildProjectAliasService
} from "../dom-service/builder/build-project-alias.service";
import {
  ProjectExecutorEnum
} from "../enum/project/project-executor.enum";
import {
  ConvertProjectSchemeService
} from "../dom-service/converter/convert-project-scheme.service";

@singleton()
/**
 * The app service is responsible for manipulate of project.
 */
export class ProjectAppService {
  constructor(
    private readonly convertProjectType: ConvertProjectTypeService,
    private readonly pathUtils: PathUtilsService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly convertProjectScheme: ConvertProjectSchemeService
  ) {
  }

  getProjectType(type: string): ProjectTypeEnum {
    return this.convertProjectType.toProjectType(type);
  }

  getProjectPath(name: string, type: string, path: string): string {
    if (path === EMPTY_STRING) {
      const projectType = this.convertProjectType.toProjectType(type);
      const workspaceType = this.convertProjectType.toWorkspaceFolder(
        projectType
      );
      return this.pathUtils.createPath([
        WorkspaceFolderEnum.projects, workspaceType, name
      ]);
    }
    return this.pathUtils.createPath([path, name]);
  }

  getProjectAlias(name: string, type: string): string {
    const projectType = this.convertProjectType.toProjectType(type);
    return this.buildProjectAlias.buildAlias(name, projectType);
  }

  getProjectScheme(scheme: string): ProjectExecutorEnum {
    return this.convertProjectScheme.toProjectExecutor(scheme);
  }
}
