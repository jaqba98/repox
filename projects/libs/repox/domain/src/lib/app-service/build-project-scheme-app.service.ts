import { singleton } from "tsyringe";
import { ProjectSchemeEnum } from "../enum/project-scheme.enum";
import {
  RepoxSchemeDtoModel
} from "../model/dto-model/repox-dto.model";

@singleton()
/**
 * The app service is responsible for building project scheme
 * for given type.
 */
export class BuildProjectSchemeAppService {
  buildScheme(scheme: ProjectSchemeEnum): RepoxSchemeDtoModel {
    return {
      type: scheme,
      build: {}
    }
  }
}
// todo: refactor
