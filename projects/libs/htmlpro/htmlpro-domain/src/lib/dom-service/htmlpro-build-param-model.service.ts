import { singleton } from "tsyringe";
import {
  EmptyRepoxCommandModel,
  EmptyRepoxProgramModel
} from "@lib/repox-domain";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  BuildHtmlHtmlproCommandModel,
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

  emptyProgram(): EmptyRepoxProgramModel {
    return {};
  }

  emptyCommand(): EmptyRepoxCommandModel {
    return {};
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
