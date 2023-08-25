import { singleton } from "tsyringe";
import {
  ConvertProjectTypeService
} from "../converter/convert-project-type.service";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
  constructor (
    private readonly convertProjectType: ConvertProjectTypeService
  ) {
  }

  buildAlias (name: string, type: string | undefined): string {
    if (type === `app` || type === undefined) return ``;
    const projectType = this.convertProjectType.toProjectType(type);
    return `@${projectType}/${name}`;
  }
}
// todo: refactor the file
