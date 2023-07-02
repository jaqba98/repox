import { singleton } from "tsyringe";
import { ProjectTypeEnum } from "../enum/project/project-type.enum";
import {
  ConvertProjectTypeService
} from "../dom-service/converter/convert-project-type.service";
import {
  BuildProjectAliasService
} from "../dom-service/builder/build-project-alias.service";
import {
  ProjectSchemeEnum
} from "../enum/project/project-scheme.enum";
import {
  ConvertProjectSchemeService
} from "../dom-service/converter/convert-project-scheme.service";
import {
  BuildProjectPathService
} from "../dom-service/builder/build-project-path.service";

@singleton()
/**
 * The service gives methods to manage projects.
 */
export class ProjectAppService {
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

  getProjectScheme(scheme: string): ProjectSchemeEnum {
    return this.convertProjectScheme.toProjectExecutor(scheme);
  }
}
// todo: refactor
