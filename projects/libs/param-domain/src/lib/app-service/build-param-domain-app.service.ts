import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ParamDomainValidationService
} from "../dom-service/validation-domain/param-domain-validation.service";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";
import { ParamDtoModel } from "@lib/param-dto";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from command line.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly paramDomain: ParamDomainValidationService
  ) {
  }

  build(paramDto: ParamDtoModel): ParamDomainValidationModel {
    const paramDomain = this.buildParamDomain.build(paramDto);
    return this.paramDomain.runValidation(paramDomain);
  }
}
// todo: refactor