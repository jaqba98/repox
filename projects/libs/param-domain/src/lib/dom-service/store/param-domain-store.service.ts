import { singleton } from "tsyringe";
import {
  type ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  type ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The service is responsible for store parameters domain data
 * and validation domain result.
 */
export class ParamDomainStoreService {
  private domain: ParamDomainModel | undefined;
  private validation: ParamDomainValidationModel | undefined;

  setParamDomain (domain: ParamDomainModel): void {
    this.domain = domain;
  }

  setParamDomainValidation (
    validation: ParamDomainValidationModel
  ): void {
    this.validation = validation;
  }

  getParamDomain (): ParamDomainModel {
    if (this.domain === undefined) {
      throw new Error(`The domain store is undefined!`);
    }
    return this.domain;
  }

  getParamDomainValidation (): ParamDomainValidationModel {
    if (this.validation === undefined) {
      throw new Error(`The validation store is undefined!`);
    }
    return this.validation;
  }
}
// todo: refactor the file
