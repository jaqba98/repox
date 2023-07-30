import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  HtmlProCommandEnum,
  HtmlProProgramEnum,
  THtmlProCommandModel,
  THtmlProProgramModel
} from "@lib/htmlpro-domain";
import {
  HtmlProBuildParamModelService
} from "../dom-service/html-pro-build-param-model.service";

@singleton()
/**
 * The app service is responsible for building HtmlPro param model
 * for given program and command.
 */
export class HtmlProBuildParamModelAppService {
  constructor(
    private readonly htmlProBuild: HtmlProBuildParamModelService,
    private readonly paramDom: ParamDomainAppService
  ) {
  }

  buildProgramParamModel(): THtmlProProgramModel {
    const programName = this.paramDom.getParamDomain().program.name;
    if (programName === HtmlProProgramEnum.default) {
      return this.htmlProBuild.defaultProgram();
    }
    return this.htmlProBuild.emptyProgram();
  }

  buildCommandParamModel(): THtmlProCommandModel {
    const programName = this.paramDom.getParamDomain().program.name;
    const commandName = this.paramDom.getParamDomain().command.name;
    if (programName === HtmlProProgramEnum.build) {
      if (commandName === HtmlProCommandEnum.html) {
        return this.htmlProBuild.buildHtmlCommand();
      }
    }
    return this.htmlProBuild.emptyCommand();
  }
}
