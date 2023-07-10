import { singleton } from "tsyringe";
import { ProjectSchemeEnum } from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for convert scheme to project executor.
 */
export class ConvertProjectSchemeService {
  toProjectExecutor(scheme: string): ProjectSchemeEnum {
    switch (scheme) {
      case ProjectSchemeEnum.typescript:
        return ProjectSchemeEnum.typescript;
      default:
        throw new Error("Failed to convert the project scheme!");
    }
  }
}
// todo: refactor
