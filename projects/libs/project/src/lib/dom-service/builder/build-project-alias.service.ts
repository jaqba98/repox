import { singleton } from "tsyringe";
import { ProjectTypeEnum, } from "../../enum/project-type.enum";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
  buildAlias(type: ProjectTypeEnum, name: string): string {
    return `@${type}/${name}`;
  }
}
