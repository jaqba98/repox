import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import {
  BuildParamDomainAppService,
  ParamDomainAppService
} from "@lib/param-domain";
import { SelectProgramAppService } from "@lib/launcher";
import { ParamErrorMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly selectProgram: SelectProgramAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  run(): void {
    this.buildParamDto.read();
    const paramDto = this.getParamDtoData.getParamDtoValidation();
    if (!paramDto.success) {
      this.paramErrorMessage.writeParamError(
        paramDto.wrongIndexes,
        paramDto.baseValues,
        paramDto.errors,
        paramDto.tips,
        REPOX_LOGO
      );
      return;
    }
    this.buildParamDomain.build();
    const paramDomain = this.getParamDomainData
      .getParamDomainValidation();
    if (!paramDomain.success) {
      this.paramErrorMessage.writeParamError(
        paramDomain.wrongIndexes,
        paramDto.baseValues,
        paramDomain.errors,
        paramDomain.tips,
        REPOX_LOGO
      );
      return;
    }
    this.selectProgram.selectProgram();
  }
}

container.resolve(MainService).run();
// todo: refactor
