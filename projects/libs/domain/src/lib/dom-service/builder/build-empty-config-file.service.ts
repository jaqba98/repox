import { singleton } from "tsyringe";
import { DomainConfigModel } from "../../model/domain-config.model";
import { SYSTEM_VERSION } from "@lib/const";

@singleton()
/**
 * Build empty content of domain config repox file.
 */
export class BuildEmptyConfigFileService {
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
