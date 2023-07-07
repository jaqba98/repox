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
import { LauncherAppService } from "@lib/launcher";
import {
  AliasRepoxEnum,
  ArgumentRepoxEnum,
  CommandAliasRepoxEnum,
  CommandRepoxEnum,
  ProgramAliasRepoxEnum,
  ProgramRepoxEnum,
  RepoxGetParamDepService,
  RepoxLaunchProgramService
} from "@tool/repox-domain";

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
    private readonly launcher: LauncherAppService,
    private readonly repoxLaunchProgram: RepoxLaunchProgramService
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
      ProgramRepoxEnum,
      ProgramAliasRepoxEnum,
      CommandRepoxEnum,
      CommandAliasRepoxEnum,
      ArgumentRepoxEnum,
      AliasRepoxEnum,
      container.resolve(RepoxGetParamDepService)
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
    const programs = this.repoxLaunchProgram.getPrograms();
    this.launcher.launchProgram(programs);
  }
}

container.resolve(MainService).run();
