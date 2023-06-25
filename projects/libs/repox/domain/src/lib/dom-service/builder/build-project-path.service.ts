import { singleton } from "tsyringe";
import { join } from "path";
import { ProjectTypeEnum, } from "../../enum/project-type.enum";
import { ProjectFolderEnum } from "../../enum/project-folder.enum";

@singleton()
/**
 * The service is responsible for create folder path for project.
 */
export class BuildProjectPathService {
  buildPath(name: string, type: ProjectTypeEnum): string {
    switch (type) {
      case ProjectTypeEnum.app:
        return this.getPath(ProjectFolderEnum.apps, name);
      case ProjectTypeEnum.lib:
        return this.getPath(ProjectFolderEnum.libs, name);
      case ProjectTypeEnum.tool:
        return this.getPath(ProjectFolderEnum.tools, name);
      default:
        throw new Error("Failed to generate project path!");
    }
  }

  private getPath(
    type: ProjectFolderEnum,
    name: string
  ): string {
    return join("projects", type, name).replace(/\\/g, "/");
  }
}
// todo: refactor
