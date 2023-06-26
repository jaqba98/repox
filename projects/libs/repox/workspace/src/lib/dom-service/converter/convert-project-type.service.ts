import { singleton } from "tsyringe";
import { DomainTypeEnum } from "../../enum/domain-type.enum";

@singleton()
/**
 * The service is responsible for convert string to project type.
 */
export class ConvertProjectTypeService {
  convert(type: string): DomainTypeEnum {
    switch (type) {
      case "app":
        return DomainTypeEnum.app;
      case "lib":
        return DomainTypeEnum.lib;
      case "tool":
        return DomainTypeEnum.tool;
      default:
        throw new Error("Failed to convert the project type!");
    }
  }
}
// todo: refactor
