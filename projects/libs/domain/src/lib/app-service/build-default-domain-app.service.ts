import { singleton } from "tsyringe";
import {
  GIT_IGNORE_DEFAULT,
  REPOX_CONFIG_DEFAULT,
  TSCONFIG_DEFAULT
} from "../const/default-domain.const";
import { TsconfigDomainModel } from "../model/tsconfig-domain.model";
import { RepoxDomainModel } from "../model/repox-domain.model";

@singleton()
/**
 * The service is responsible for building default content
 * for all domain files.
 */
export class BuildDefaultDomainAppService {
  buildGitIgnore(): string {
    return GIT_IGNORE_DEFAULT;
  }

  buildTsconfig(): TsconfigDomainModel {
    return TSCONFIG_DEFAULT;
  }

  buildRepoxConfig(): RepoxDomainModel {
    return REPOX_CONFIG_DEFAULT;
  }
}
