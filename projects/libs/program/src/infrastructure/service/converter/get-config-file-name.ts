import { singleton } from "tsyringe";
import { RepoxConfigFileEnum } from "../../../../../domain/src/enum/repox-config-file.enum";

/**
 * Converter to get config file name.
 */
@singleton()
export class GetConfigFileName {
  getConfig(configType: string): RepoxConfigFileEnum {
    switch (configType) {
      case "json":
        return RepoxConfigFileEnum.repoxConfigJson;
      default:
        return RepoxConfigFileEnum.repoxConfigJson;
    }
  }
}
// todo: refactor