import { singleton } from "tsyringe";
import { ConfigFileEnum } from "../../../enum/config-file.enum";

/**
 * Converter to get config file name.
 */
@singleton()
export class GetConfigFileName {
  getConfig(configType: string): ConfigFileEnum {
    switch (configType) {
      case "json":
        return ConfigFileEnum.configJson;
      default:
        return ConfigFileEnum.configJson;
    }
  }
}
// todo: refactor