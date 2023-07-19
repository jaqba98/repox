import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import {
  ConvertProjectTypeService
} from "../converter/convert-project-type.service";
import { EMPTY_STRING } from "@lib/const";
import {
  WorkspaceFolderEnum
} from "../../enum/workspace/workspace-folder.enum";

@singleton()
/**
 * The service is responsible for create path for project.
 */
export class BuildProjectPathService {
  constructor(
    private readonly pathUtils: PathUtilsService,
    private readonly convertProjectType: ConvertProjectTypeService
  ) {
  }

  buildPath(name: string, type: string, path: string): string {
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
}
