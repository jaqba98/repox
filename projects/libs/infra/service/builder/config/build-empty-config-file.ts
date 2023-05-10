import { singleton } from "tsyringe";
import {
  RepoxConfigModel
} from "../../../../model/config/repox-config-model";
import { SYSTEM_VERSION } from "../../../../const/domain.const";

/**
 * Build empty content of config repox file.
 */
@singleton()
export class BuildEmptyConfigFile {
  buildConfigFile(): RepoxConfigModel {
    return {
      version: SYSTEM_VERSION,
      projects: {
        apps: {},
        libs: {},
        tools: {}
      }
    };
  }
}
