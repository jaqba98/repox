import { singleton } from "tsyringe";
import {
  BuildEmptyConfigFileService
} from "../dom-service/builder/build-empty-config-file.service";
import { DomainConfigModel } from "../model/domain-config.model";

@singleton()
/**
 * The app service which is responsible for building
 * config file for repox.
 */
export class BuildConfigFileAppService {
  constructor(
    private readonly buildEmptyConfigFile: BuildEmptyConfigFileService
  ) {
  }

  buildEmptyDomainConfig(): DomainConfigModel {
    return this.buildEmptyConfigFile.buildConfigFile();
  }
}
// todo: refactor