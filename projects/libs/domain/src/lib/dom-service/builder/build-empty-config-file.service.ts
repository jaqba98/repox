import { singleton } from "tsyringe";
import { RepoxConfigModel } from "../../model/repox-config.model";
import { SYSTEM_VERSION } from "@lib/const";

@singleton()
/**
 * Build empty content of domain config repox file.
 */
export class BuildEmptyConfigFileService {
  buildConfigFile(): RepoxConfigModel {
    return {
      version: SYSTEM_VERSION,
      projects: {}
    };
  }
}
// todo: refactor