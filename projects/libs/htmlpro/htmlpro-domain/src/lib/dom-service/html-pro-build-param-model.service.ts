import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  BuildHtmlHtmlProCommandModel,
  DefaultDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel,
  EmptyHtmlProProgramModel,
  HtmlProArgumentEnum
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

  buildHtmlCommand(): BuildHtmlHtmlProCommandModel {
    return {
      inputPath: this.paramDomain.getCommandStringValue(
        HtmlProArgumentEnum.input
      ),
      outputPath: this.paramDomain.getCommandStringValue(
        HtmlProArgumentEnum.output
      )
    };
  }
}
