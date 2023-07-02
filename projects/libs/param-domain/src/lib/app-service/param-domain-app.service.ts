import { singleton } from "tsyringe";
import {
  ParamDomainStoreService
} from "../dom-service/store/param-domain-store.service";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";

@singleton()
/**
 * The service is responsible for give param domain data
 * for other projects.
 */
export class ParamDomainAppService {
  constructor(
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  getParamDomain(): ParamDomainModel {
    return this.paramDomainStore.getParamDomain();
  }

  getParamDomainValidation(): ParamDomainValidationModel {
    return this.paramDomainStore.getParamDomainValidation();
  }

  getProgramName(): string {
    return this.paramDomainStore.getParamDomain().program.name;
  }

  getCommandName(): string {
    return this.paramDomainStore.getParamDomain().command.name;
  }
}
// todo: refactor