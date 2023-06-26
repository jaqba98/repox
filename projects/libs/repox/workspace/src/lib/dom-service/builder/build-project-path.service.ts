import { singleton } from "tsyringe";
import { join } from "path";
import { DomainTypeEnum, } from "../../enum/domain-type.enum";
import { DomainFolderEnum } from "../../enum/domain-folder.enum";

@singleton()
/**
 * The service is responsible for create folder path for project.
 */
export class BuildProjectPathService {
  buildPath(name: string, type: DomainTypeEnum): string {
    switch (type) {
      case DomainTypeEnum.app:
        return this.getPath(DomainFolderEnum.apps, name);
      case DomainTypeEnum.lib:
        return this.getPath(DomainFolderEnum.libs, name);
      case DomainTypeEnum.tool:
        return this.getPath(DomainFolderEnum.tools, name);
      default:
        throw new Error("Failed to generate project path!");
    }
  }

  private getPath(
    type: DomainFolderEnum,
    name: string
  ): string {
    return join("projects", type, name).replace(/\\/g, "/");
  }
}
// todo: refactor
