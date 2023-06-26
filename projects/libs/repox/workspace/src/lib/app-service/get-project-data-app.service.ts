import { singleton } from "tsyringe";
import { ProjectTypeEnum } from "../enum/project/project-type.enum";
import {
  ConvertProjectTypeService
} from "../dom-service/converter/convert-project-type.service";
import {
  BuildProjectAliasService
} from "../dom-service/builder/build-project-alias.service";
import {
  ProjectExecutorEnum
} from "../enum/project/project-executor.enum";
import {
  ConvertProjectSchemeService
} from "../dom-service/converter/convert-project-scheme.service";
import {
  BuildProjectPathService
} from "../dom-service/builder/build-project-path.service";

@singleton()
/**
 * The service is responsible for get project data by input data
 * like: project type by type or project path.
 */
export class GetProjectDataAppService {
  constructor(
    private readonly convertProjectType: ConvertProjectTypeService,
    private readonly buildProjectPath: BuildProjectPathService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly convertProjectScheme: ConvertProjectSchemeService
  ) {
  }

  getProjectType(type: string): ProjectTypeEnum {
    return this.convertProjectType.toProjectType(type);
  }

  getProjectPath(name: string, type: string, path: string): string {
    return this.buildProjectPath.buildPath(name, type, path);
  }

  getProjectAlias(name: string, type: string): string {
    return this.buildProjectAlias.buildAlias(name, type);
  }

  getProjectScheme(scheme: string): ProjectExecutorEnum {
    return this.convertProjectScheme.toProjectExecutor(scheme);
  }
}
