import { singleton } from "tsyringe";
import { ProjectSchemeEnum } from "../enum/project-scheme.enum";
import { ProjectSchemeModel } from "../model/project-domain.model";

@singleton()
/**
 * The app service is responsible for building project scheme
 * for given type.
 */
export class BuildProjectSchemeAppService {
  buildScheme(scheme: ProjectSchemeEnum): ProjectSchemeModel {
    return {
      type: scheme
    }
  }
}
// todo: refactor
