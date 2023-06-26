import { singleton } from "tsyringe";
import {
  ProjectTypeEnum
} from "../../enum/project/project-type.enum";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
  buildAlias(name: string, type: ProjectTypeEnum): string {
    return `@${type}/${name}`;
  }
}
