import { singleton } from "tsyringe";
import {
  ProjectExecutorEnum
} from "../../enum/project/project-executor.enum";

@singleton()
/**
 * The service is responsible for convert scheme to project executor.
 */
export class ConvertProjectSchemeService {
  toProjectExecutor(scheme: string): ProjectExecutorEnum {
    switch (scheme) {
      case ProjectExecutorEnum.typescript:
        return ProjectExecutorEnum.typescript;
      default:
        throw new Error("Failed to convert the project scheme!");
    }
  }
}
