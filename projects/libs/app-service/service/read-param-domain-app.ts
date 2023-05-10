import { singleton } from "tsyringe";
import {
  BuildParamDomain
} from "../../dom-service/builder/build-param-domain";
import {
  ParamDomainValidation
} from "../../dom-service/validation/param-domain-validation";
import {
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation-model";

/**
 * The app service is responsible for read and validate
 * parameter domain model from command line.
 */
@singleton()
export class ReadParamDomainApp {
  constructor(
    private readonly buildParamDomain: BuildParamDomain,
    private readonly paramDomainValidation: ParamDomainValidation
  ) {
  }

  build(paramDto: ParamDtoModel): ParamDomainValidationModel {
    const paramDomain: ParamDomainModel = this.buildParamDomain
      .build(paramDto);
    return this.paramDomainValidation.runValidation(paramDomain);
  }
}
