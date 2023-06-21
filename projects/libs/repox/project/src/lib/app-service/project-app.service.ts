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

  getProjectPath(
    projectName: string,
    type: string,
    projectPath: string
  ): string {
    const projectType = this.getProjectType(type);
    return projectPath === "" ?
      this.buildProjectPath.buildPath(projectName, projectType) :
      projectPath.concat(`/${projectName}`);
  }

  getProjectAlias(name: string, type: string): string {
    const projectType = this.getProjectType(type);
    return this.buildProjectAlias.buildAlias(projectType, name);
  }

  getProjectFiles(projectPath: string): Array<string> {
    return this.readProjectFiles.readFiles(projectPath);
  }
}
// todo: refactor
