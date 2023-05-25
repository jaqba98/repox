import { singleton } from "tsyringe";
import { ReadParamDtoAppService } from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from command line.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService
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
  }
}
