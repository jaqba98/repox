import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { ReadParamDtoAppService } from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import { BuildParamDomainAppService } from "@lib/param-domain";
import { SelectProgramAppService } from "@lib/launcher";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly selectProgram: SelectProgramAppService
  ) {
  }
  run(): void {
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