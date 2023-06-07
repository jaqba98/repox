import { singleton } from "tsyringe";
import {
  ParamDomainStoreService
} from "../dom-service/store/param-domain-store.service";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The service is responsible for give param domain data
 * for other projects.
 */
export class GetParamDomainDataAppService {
  constructor(
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  getParamDomainValidation(): ParamDomainValidationModel {
    return this.paramDomainStore.getParamDomainValidation();
  }
}
