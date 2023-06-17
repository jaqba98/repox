import { singleton } from "tsyringe";
import {
  ConvertProjectTypeService
} from "../dom-service/converter/convert-project-type.service";
import {
  BuildProjectPathService
} from "../dom-service/builder/build-project-path.service";
import { ProjectTypeEnum } from "../enum/project-type.enum";
import {
  BuildProjectAliasService
} from "../dom-service/builder/build-project-alias.service";
import {
  ReadProjectFilesService
} from "../infrastructure/read-project-files.service";

@singleton()
/**
 * The app service is responsible for manipulate of project.
 */
export class ProjectAppService {
  constructor(
    private readonly convertProjectType: ConvertProjectTypeService,
    private readonly buildProjectPath: BuildProjectPathService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly readProjectFiles: ReadProjectFilesService
  ) {
  }

  getProjectType(type: string): ProjectTypeEnum {
    return this.convertProjectType.convert(type);
  }

  getProjectPath(name: string, type: ProjectTypeEnum): string {
    const projectType = this.getProjectType(type);
    return this.buildProjectPath.buildPath(name, projectType);
  }

  getProjectAlias(name: string, type: ProjectTypeEnum): string {
    return this.buildProjectAlias.buildAlias(name, type);
  }

  getProjectFiles(projectPath: string): Array<string> {
    return this.readProjectFiles.readFiles(projectPath);
  }
}
