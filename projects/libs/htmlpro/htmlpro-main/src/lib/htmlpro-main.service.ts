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
import {
  HtmlproAliasEnum,
  HtmlproArgumentEnum,
  HtmlproBuildParamModelAppService,
  HtmlproCommandAliasEnum,
  HtmlproCommandEnum,
  HtmlproGetParamDepAppService,
  HtmlproLaunchProgramAppService,
  HtmlProProgramAliasEnum,
  HtmlProProgramEnum
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
    private readonly htmlproBuild: HtmlproBuildParamModelAppService,
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
      HtmlProProgramEnum,
      HtmlProProgramAliasEnum,
      HtmlproCommandEnum,
      HtmlproCommandAliasEnum,
      HtmlproArgumentEnum,
      HtmlproAliasEnum,
      container.resolve(HtmlproGetParamDepAppService)
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
    const programDomain = this.htmlproBuild.buildProgramParamModel();
    const commandDomain = this.htmlproBuild.buildCommandParamModel();
    this.launcher.launchProgram(programs).runProgram(
      programDomain, commandDomain
    );
  }
}

container.resolve(HtmlproMainService).run();
