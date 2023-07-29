import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  BuildHtmlHtmlproCommandModel,
  DefaultDefaultHtmlproProgramModel,
  EmptyHtmlproCommandModel,
  EmptyHtmlproProgramModel,
  HtmlproArgumentEnum
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The service is responsible for building correct and complete
 * model for all kinds of programs and commends.
 */
export class HtmlproBuildParamModelService {
  constructor(private readonly paramDomain: ParamDomainAppService) {
  }

  emptyProgram(): EmptyHtmlproProgramModel {
    return {};
  }

  emptyCommand(): EmptyHtmlproCommandModel {
    return {};
  }

  defaultProgram(): DefaultDefaultHtmlproProgramModel {
    return {
      showVersion: this.paramDomain.getProgramBooleanValue(
        HtmlproArgumentEnum.version
      )
    };
  }

  buildHtmlCommand(): BuildHtmlHtmlproCommandModel {
    return {
      inputPath: this.paramDomain.getCommandStringValue(
        HtmlproArgumentEnum.input
      ),
      outputPath: this.paramDomain.getCommandStringValue(
        HtmlproArgumentEnum.output
      )
    };
  }
}
