import { singleton } from "tsyringe";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";

@singleton()
/**
 * The service is responsible for store parameters domain data
 * and validation domain result.
 */
export class ParamDomainStoreService {
  private paramDomain: ParamDomainModel | undefined;
  private paramDomainValidation:
    ParamDomainValidationModel | undefined;

  setParamDomain(paramDomain: ParamDomainModel): void {
    this.paramDomain = paramDomain;
  }

  getParamDomain(): ParamDomainModel {
    if (this.paramDomain === undefined) {
      throw new Error("The param domain store is undefined!");
    }
    return this.paramDomain;
  }

  setParamDomainValidation(
    paramDomainValidation: ParamDomainValidationModel
  ): void {
    this.paramDomainValidation = paramDomainValidation;
  }

  getParamDomainValidation(): ParamDomainValidationModel {
    if (this.paramDomainValidation === undefined) {
      throw new Error(
        "The param domain validation store is undefined!"
      );
    }
    return this.paramDomainValidation;
  }
}
