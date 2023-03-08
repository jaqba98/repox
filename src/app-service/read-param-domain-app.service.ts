// todo: refactor
import { singleton } from "tsyringe";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../model/param-domain.model";
import { ParamDtoModel } from "../infrastructure/model/param-dto/param-dto.model";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ParamDomainValidatorService
} from "../dom-service/validator/param-domain-validator.service";

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

  read(paramDto: ParamDtoModel): {
    paramDomain: ParamDomainModel,
    verifyDomain: ParamsDomainValidatorModel | true
  } {
    const paramDomain = this.buildParamDomain.build(paramDto);
    const verifyDomain = this.paramDomainValidator.verify(paramDomain);
    return { paramDomain, verifyDomain };
  }
}
