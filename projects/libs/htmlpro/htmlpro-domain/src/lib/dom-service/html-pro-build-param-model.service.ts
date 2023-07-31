import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  BuildDefaultHtmlProProgramModel,
  DefaultDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel,
  EmptyHtmlProProgramModel,
  HtmlProArgumentEnum,
  InitDefaultHtmlProProgramModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The service is responsible for building correct and complete
 * model for all kinds of programs and commends.
 */
export class HtmlProBuildParamModelService {
  constructor(private readonly paramDomain: ParamDomainAppService) {
  }

  emptyProgram(): EmptyHtmlProProgramModel {
    return {};
  }

  emptyCommand(): EmptyHtmlProCommandModel {
    return {};
  }

  defaultProgram(): DefaultDefaultHtmlProProgramModel {
    return {
      showVersion: this.paramDomain.getProgramBooleanValue(
        HtmlProArgumentEnum.version
      )
    };
  }

  initDefaultProgram(): InitDefaultHtmlProProgramModel {
    return {
      isForce: this.paramDomain.getProgramBooleanValue(
        HtmlProArgumentEnum.force
      )
    };
  }

  buildDefaultProgram(): BuildDefaultHtmlProProgramModel {
    return {
      inputPath: this.paramDomain.getProgramStringValue(
        HtmlProArgumentEnum.input
      ),
      outputPath: this.paramDomain.getProgramStringValue(
        HtmlProArgumentEnum.output
      )
    };
  }
}
