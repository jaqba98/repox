import { container, singleton } from "tsyringe";
import { LauncherModel } from "@lib/launcher";
import { HtmlproProgramEnum } from "../enum/htmlpro-program.enum";
import { HtmlproCommandEnum } from "../enum/htmlpro-command.enum";
import {
  BuildHtmlProgramService,
  DefaultDefaultProgramService
} from "@lib/htmlpro-program";

@singleton()
/**
 * The app service is responsible for giving all programs
 * for htmlpro project.
 */
export class HtmlproLaunchProgramAppService {
  getPrograms(): LauncherModel {
    return {
      programs: [
        {
          programName: HtmlproProgramEnum.default,
          commandName: HtmlproCommandEnum.default,
          service: container.resolve(DefaultDefaultProgramService)
        },
        {
          programName: HtmlproProgramEnum.build,
          commandName: HtmlproCommandEnum.html,
          service: container.resolve(BuildHtmlProgramService)
        }
      ]
    };
  }
}
