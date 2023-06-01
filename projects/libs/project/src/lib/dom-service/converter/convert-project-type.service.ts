import { singleton } from "tsyringe";
import { ProjectTypeEnum } from "../../enum/project-type.enum";

@singleton()
/**
 * The service is responsible for convert string to project type.
 */
export class ConvertProjectTypeService {
  convert(type: string): ProjectTypeEnum {
    switch (type) {
      case "app":
        return ProjectTypeEnum.app;
      case "lib":
        return ProjectTypeEnum.lib;
      case "tool":
        return ProjectTypeEnum.tool;
      default:
        throw new Error("Failed to convert the project type!");
    }
  }
}
// todo: refactor