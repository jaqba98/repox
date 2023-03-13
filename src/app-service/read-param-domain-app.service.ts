import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ParamDtoModel
} from "../infra/model/param-dto/param-dto.model";
import {
  ParamDomainValidatorService
} from "../dom-service/validation/param-domain-validator.service";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";

@singleton()
/**
 * The app service is responsible for:
 * 1) Build parameter domain model.
 * 2) Validate the parameter domain model.
 */
export class ReadParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly paramDomainValidator: ParamDomainValidatorService
  ) {
  }

  build(paramDto: ParamDtoModel): ParamDomainValidationModel {
    const paramDomain = this.buildParamDomain.build(paramDto);
    return this.paramDomainValidator.runValidation(paramDomain);
  }
}
