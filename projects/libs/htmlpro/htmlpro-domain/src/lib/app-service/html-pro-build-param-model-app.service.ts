import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
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
    if (programName === HtmlProProgramEnum.init) {
      return this.htmlProBuild.initDefaultProgram();
    }
    if (programName === HtmlProProgramEnum.build) {
      return this.htmlProBuild.buildDefaultProgram();
    }
    return this.htmlProBuild.emptyProgram();
  }

  buildCommandParamModel(): THtmlProCommandModel {
    return this.htmlProBuild.emptyCommand();
  }
}
