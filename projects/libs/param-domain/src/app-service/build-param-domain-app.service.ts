import { singleton } from "tsyringe";
import { ReadParamDtoAppService } from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from command line.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainService
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
    console.log(JSON.stringify(paramDomain, null, 2));
  }
}
