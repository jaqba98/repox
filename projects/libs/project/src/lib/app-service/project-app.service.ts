import { singleton } from "tsyringe";
import {
  ConvertProjectTypeService
} from "../dom-service/converter/convert-project-type.service";
import {
  BuildProjectPathService
} from "../dom-service/builder/build-project-path.service";
import { ProjectTypeEnum } from "../enum/project-type.enum";

@singleton()
/**
 * The app service is responsible for manipulate of project.
 */
export class ProjectAppService {
  constructor(
    private readonly convertProjectType: ConvertProjectTypeService,
    private readonly buildProjectPath: BuildProjectPathService
  ) {
  }

  getProjectPath(name: string, type: ProjectTypeEnum): string {
    const projectType = this.getProjectType(type);
    return this.buildProjectPath.buildPath(name, projectType);
  }

  getProjectType(type: string): ProjectTypeEnum {
    return this.convertProjectType.convert(type);
  }
}
