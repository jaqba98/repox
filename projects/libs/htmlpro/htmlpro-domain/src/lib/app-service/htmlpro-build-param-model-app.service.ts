import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  HtmlproCommandEnum,
  HtmlproProgramEnum,
  THtmlproCommandModel,
  THtmlproProgramModel
} from "@lib/htmlpro-domain";
import {
  HtmlproBuildParamModelService
} from "../dom-service/htmlpro-build-param-model.service";

@singleton()
/**
 * The app service is responsible for building htmlpro param model
 * for given program and command.
 */
export class HtmlproBuildParamModelAppService {
  constructor(
    private readonly htmlproBuildParam: HtmlproBuildParamModelService,
    private readonly paramDom: ParamDomainAppService
  ) {
  }

  buildProgramParamModel(): THtmlproProgramModel {
    const programName = this.paramDom.getParamDomain().program.name;
    if (programName === HtmlproProgramEnum.default) {
      return this.htmlproBuildParam.emptyProgram();
    }
    return this.htmlproBuildParam.emptyProgram();
  }

  buildCommandParamModel(): THtmlproCommandModel {
    const programName = this.paramDom.getParamDomain().program.name;
    const commandName = this.paramDom.getParamDomain().command.name;
    if (programName === HtmlproProgramEnum.build) {
      if (commandName === HtmlproCommandEnum.html) {
        return this.htmlproBuildParam.buildHtmlCommand();
      }
    }
    return this.htmlproBuildParam.emptyCommand();
  }
}
