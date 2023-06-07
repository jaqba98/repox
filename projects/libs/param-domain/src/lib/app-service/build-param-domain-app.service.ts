import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ValidationParamDomainService
} from "../dom-service/validation/validation-param-domain.service";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly paramDomain: ValidationParamDomainService
  ) {
  }

  build(): void {
    this.buildParamDomain.build();
    this.paramDomain.runValidation();
  }
}
