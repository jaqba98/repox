import { singleton } from "tsyringe";
import { DomainConfigModel, SYSTEM_VERSION } from "@lib/domain";

@singleton()
/**
 * Build empty content of domain config repox file.
 */
export class BuildEmptyDomainConfigFileService {
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