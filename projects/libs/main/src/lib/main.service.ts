import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import { BuildParamDomainAppService } from "@lib/param-domain";
import { SelectProgramAppService } from "@lib/launcher";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDto: BuildParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly selectProgram: SelectProgramAppService,
    private readonly getParamDto: GetParamDtoDataAppService
  ) {
  }
  run(): void {
    this.readParamDto.read();
    const paramDto = this.getParamDto.getParamDtoValidation();
    if (!paramDto.success) {
      this.paramErrorMessage.writeParamError(
        paramDto.wrongIndexes,
        paramDto.baseValues,
        paramDto.errors,
        paramDto.tips
      );
      return;
    }
    const paramDomain = this.buildParamDomain.build();
    if (!paramDomain.success) {
      this.paramErrorMessage.writeParamError(
        paramDomain.wrongParamIndexes,
        paramDto.baseValues,
        paramDomain.errors,
        paramDomain.tips
      );
      return;
    }
    this.selectProgram.selectProgram(paramDomain.paramDomain);
  }
}

container.resolve(MainService).run();
// todo: refactor