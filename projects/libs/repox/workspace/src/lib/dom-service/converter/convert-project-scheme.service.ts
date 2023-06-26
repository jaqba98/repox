import { singleton } from "tsyringe";
import { ProjectSchemeEnum } from "@lib/workspace";

@singleton()
/**
 * The service is responsible for convert scheme to project executor.
 */
export class ConvertProjectSchemeService {
  toProjectExecutor(scheme: string): ProjectSchemeEnum {
    switch (scheme) {
      case ProjectSchemeEnum.schemeTypescript:
        return ProjectSchemeEnum.schemeTypescript;
      default:
        throw new Error("Failed to convert the project scheme!");
    }
  }
}
