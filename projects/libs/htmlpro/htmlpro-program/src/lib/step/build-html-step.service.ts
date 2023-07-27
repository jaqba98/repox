import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { HTMLPRO_LOGO } from "@lib/htmlpro-const";
import {
  BuildHtmlHtmlproCommandModel,
  EmptyHtmlproProgramModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The list of steps for the program build html.
 */
export class BuildHtmlStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  runSteps(
    programModel: EmptyHtmlproProgramModel,
    commandModel: BuildHtmlHtmlproCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build html", HTMLPRO_LOGO);
    console.log(commandModel.filePath);
  }
}
