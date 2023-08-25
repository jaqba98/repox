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
  HtmlProAliasEnum,
  HtmlProArgumentEnum,
  HtmlProBuildParamModelAppService,
  HtmlProCommandAliasEnum,
  HtmlProCommandEnum,
  HtmlProGetParamDepAppService,
  HtmlProLaunchProgramAppService,
  HtmlProProgramAliasEnum,
  HtmlProProgramEnum
} from "@lib/htmlpro-domain";
import { LauncherAppService } from "@lib/launcher";
import { HTML_PRO_LOGO } from "@lib/htmlpro-const";

@singleton()
/**
 * The main service is responsible for run HtmlPro program.
 */
export class HtmlProMainService {
  constructor (
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly paramDomain: ParamDomainAppService,
    private readonly launchProgram: HtmlProLaunchProgramAppService,
    private readonly htmlProBuild: HtmlProBuildParamModelAppService,
    private readonly launcher: LauncherAppService
  ) {
  }

  run (): void {
    this.buildParamDto.build();
    const paramDtoValidation = this.getParamDtoData
      .getParamDtoValidation();
    if (!paramDtoValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDtoValidation.wrongIndexes,
        paramDtoValidation.baseValues,
        paramDtoValidation.errors,
        paramDtoValidation.tips,
        HTML_PRO_LOGO
      );
      return;
    }
    this.buildParamDomain.build(
      HtmlProProgramEnum,
      HtmlProProgramAliasEnum,
      HtmlProCommandEnum,
      HtmlProCommandAliasEnum,
      HtmlProArgumentEnum,
      HtmlProAliasEnum,
      container.resolve(HtmlProGetParamDepAppService)
    );
    const paramDomainValidation = this.paramDomain
      .getParamDomainValidation();
    if (!paramDomainValidation.success) {
      this.paramErrorMessage.writeParamError(
        paramDomainValidation.wrongIndexes,
        paramDtoValidation.baseValues,
        paramDomainValidation.errors,
        paramDomainValidation.tips,
        HTML_PRO_LOGO
      );
      return;
    }
    const programs = this.launchProgram.getPrograms();
    const programDomain = this.htmlProBuild.buildProgramParamModel();
    const commandDomain = this.htmlProBuild.buildCommandParamModel();
    this.launcher.launchProgram(programs).run(
      programDomain, commandDomain
    );
  }
}

container.resolve(HtmlProMainService).run();
// todo: refactor the file
