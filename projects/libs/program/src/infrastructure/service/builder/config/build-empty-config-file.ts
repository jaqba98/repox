import { singleton } from "tsyringe";
import {
  DomainConfigModel
} from "../../../../../../domain/src/model/domain-config.model";
import { SYSTEM_VERSION } from "../../../../../../domain/src/const/domain.const";

/**
 * Build empty content of config repox file.
 */
@singleton()
export class BuildEmptyConfigFile {
  buildConfigFile(): DomainConfigModel {
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
// todo: refactor