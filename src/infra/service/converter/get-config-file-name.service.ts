import { singleton } from "tsyringe";
import {
  ConfigFile
} from "../../enum/config-file";

@singleton()
export class GetConfigFileNameService {
  getConfigFileName(configType: string): string {
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
// todo: refactor this