import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ParamDomainValidationService
} from "../dom-service/validation/param-domain-validation.service";
import {
  ParamDtoModel
} from "../infra/model/param-dto/param-dto.model";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The app service is responsible for build and validate
 * the parameter domain model.
 */
export class ReadParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly paramValidation: ParamDomainValidationService
  ) {
  }

  build(paramDto: ParamDtoModel): ParamDomainValidationModel {
    const paramDomain = this.buildParamDomain.build(paramDto);
    return this.paramValidation.runValidation(paramDomain);
  }
}
