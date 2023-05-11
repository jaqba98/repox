import { singleton } from "tsyringe";
import { ConfigFile } from "../../enum/config-file";

/**
 * Converter to get config file name.
 */
@singleton()
export class GetConfigFileName {
  getConfig(configType: string): ConfigFile {
    switch (configType) {
      case "json":
        return ConfigFile.configJson;
      case "js":
        return ConfigFile.configJs;
      case "ts":
        return ConfigFile.configTs;
      default:
        return ConfigFile.configJson;
    }
  }
}
// todo: refactor