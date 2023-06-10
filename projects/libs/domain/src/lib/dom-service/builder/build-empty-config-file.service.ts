import { singleton } from "tsyringe";
import { RepoxDomainModel } from "../../model/repox-domain.model";
import { SYSTEM_VERSION } from "@lib/const";

@singleton()
/**
 * Build empty content of domain config repox file.
 */
export class BuildEmptyConfigFileService {
  buildConfigFile(): RepoxDomainModel {
    return {
      version: SYSTEM_VERSION,
      projects: {}
    };
  }
}
// todo: refactor