import { singleton } from "tsyringe";
import { ReadParamDtoAppService } from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ParamDomainValidationService
} from "../dom-service/validation-domain/param-domain-validation.service";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from command line.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly paramDomain: ParamDomainValidationService
  ) {
  }

  build(): void {
    const paramDto = this.readParamDto.read();
    if (!paramDto.success) {
      this.paramErrorMessage.writeParamError(
        paramDto.wrongParamIndexes,
        paramDto.baseValues,
        paramDto.errors,
        paramDto.tips
      );
      return;
    }
    const paramDomain = this.buildParamDomain.build(paramDto.model);
    const paramDomainValidation = this.paramDomain.runValidation(
      paramDomain
    );
    if (!paramDomainValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDomainValidation.wrongParamIndexes,
        paramDto.baseValues,
        paramDomainValidation.errors,
        paramDomainValidation.tips
      );
      return;
    }
    console.log(JSON.stringify(paramDomainValidation, null, 2));
  }
}
