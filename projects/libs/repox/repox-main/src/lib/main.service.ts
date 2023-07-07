import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  BuildParamDomainAppService,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  AliasEnum,
  ArgumentEnum,
  CommandAliasEnum,
  CommandEnum,
  GetParamDepService,
  ProgramAliasEnum,
  ProgramEnum
} from "@lib/workspace";
import { LauncherAppService } from "@lib/launcher";

@singleton()
/**
 * Main launch point of the repox program.
 */
export class MainService {
  constructor(
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly paramDomain: ParamDomainAppService,
    private readonly launcher: LauncherAppService
  ) {
  }

  run(): void {
    this.buildParamDto.build();
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
    this.buildParamDomain.build(
      ProgramEnum,
      ProgramAliasEnum,
      CommandEnum,
      CommandAliasEnum,
      ArgumentEnum,
      AliasEnum,
      container.resolve(GetParamDepService)
    );
    const paramDomain = this.paramDomain.getParamDomainValidation();
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
    this.launcher.launchProgram({ programs: [] });
  }
}

container.resolve(MainService).run();
