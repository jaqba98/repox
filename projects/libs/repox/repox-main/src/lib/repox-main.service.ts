import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import {
  BuildParamDomainAppService,
  ParamDomainAppService
} from "@lib/param-domain";
import { LauncherAppService } from "@lib/launcher";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  RepoxAliasEnum,
  RepoxArgumentEnum,
  RepoxBuildParamModelService, RepoxBuildParamModelAppService,
  RepoxCommandAliasEnum,
  RepoxCommandEnum, RepoxGetParamDepAppService,
  RepoxLaunchProgramAppService,
  RepoxProgramAliasEnum,
  RepoxProgramEnum
} from "@lib/repox-domain";

@singleton()
/**
 * The main service is responsible for run repox program.
 */
export class RepoxMainService {
  constructor(
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly paramDomain: ParamDomainAppService,
    private readonly launcher: LauncherAppService,
    private readonly repoxLaunchProgram: RepoxLaunchProgramAppService,
    private readonly buildDomainModel: RepoxBuildParamModelService,
    private readonly repoxBuildParamModel: RepoxBuildParamModelAppService
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
      RepoxProgramEnum,
      RepoxProgramAliasEnum,
      RepoxCommandEnum,
      RepoxCommandAliasEnum,
      RepoxArgumentEnum,
      RepoxAliasEnum,
      container.resolve(RepoxGetParamDepAppService)
    );
    const paramDomainValidation = this.paramDomain
      .getParamDomainValidation();
    if (!paramDomainValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDomainValidation.wrongIndexes,
        paramDto.baseValues,
        paramDomainValidation.errors,
        paramDomainValidation.tips,
        REPOX_LOGO
      );
      return;
    }
    const repoxPrograms = this.repoxLaunchProgram.getPrograms();
    const programDomain = this.repoxBuildParamModel
      .buildProgramParamModel();
    const commandDomain = this.repoxBuildParamModel
      .buildCommandParamModel();
    this.launcher.launchProgram(repoxPrograms).runProgram(
      programDomain, commandDomain
    );
  }
}

container.resolve(RepoxMainService).run();
// todo: refactor
