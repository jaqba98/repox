import { container, singleton } from "tsyringe";
import { LauncherModel } from "@lib/launcher";
import { HtmlProProgramEnum } from "../enum/html-pro-program.enum";
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
          programName: HtmlProProgramEnum.default,
          commandName: HtmlproCommandEnum.default,
          service: container.resolve(DefaultDefaultProgramService)
        },
        {
          programName: HtmlProProgramEnum.build,
          commandName: HtmlproCommandEnum.html,
          service: container.resolve(BuildHtmlProgramService)
        }
      ]
    };
  }
}
