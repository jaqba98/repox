import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { RepoxGetParamDepAppService } from "@lib/repox-domain";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import { ParamErrorMessageAppService } from "@lib/logger";
import {
  BuildParamDomainAppService,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  HtmlproAliasEnum,
  HtmlproArgumentEnum,
  HtmlproCommandAliasEnum,
  HtmlproCommandEnum,
  HtmlproLaunchProgramAppService,
  HtmlproProgramAliasEnum,
  HtmlproProgramEnum
} from "@lib/htmlpro-domain";
import { LauncherAppService } from "@lib/launcher";
import { HTMLPRO_LOGO } from "@lib/htmlpro-const";

@singleton()
/**
 * The main service is responsible for run htmlpro program.
 */
export class HtmlproMainService {
  constructor(
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly paramDomain: ParamDomainAppService,
    private readonly launchProgram: HtmlproLaunchProgramAppService,
    // private readonly buildParamModel: RepoxBuildParamModelAppService,
    private readonly launcher: LauncherAppService
  ) {
  }

  run(): void {
    this.buildParamDto.build();
    const paramDtoValidation = this.getParamDtoData
      .getParamDtoValidation();
    if (!paramDtoValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDtoValidation.wrongIndexes,
        paramDtoValidation.baseValues,
        paramDtoValidation.errors,
        paramDtoValidation.tips,
        HTMLPRO_LOGO
      );
      return;
    }
    this.buildParamDomain.build(
      HtmlproProgramEnum,
      HtmlproProgramAliasEnum,
      HtmlproCommandEnum,
      HtmlproCommandAliasEnum,
      HtmlproArgumentEnum,
      HtmlproAliasEnum,
      container.resolve(RepoxGetParamDepAppService)
    );
    const paramDomainValidation = this.paramDomain
      .getParamDomainValidation();
    if (!paramDomainValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDomainValidation.wrongIndexes,
        paramDtoValidation.baseValues,
        paramDomainValidation.errors,
        paramDomainValidation.tips,
        HTMLPRO_LOGO
      );
      return;
    }
    const programs = this.launchProgram.getPrograms();
    // const programDomain = this.buildParamModel
    //   .buildProgramParamModel();
    // const commandDomain = this.buildParamModel
    //   .buildCommandParamModel();
    this.launcher.launchProgram(programs).runProgram(
      undefined, undefined
    );
  }
}

container.resolve(HtmlproMainService).run();
