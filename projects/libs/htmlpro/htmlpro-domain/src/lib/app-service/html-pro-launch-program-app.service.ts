import { container, singleton } from "tsyringe";
import { LauncherModel } from "@lib/launcher";
import { HtmlProProgramEnum } from "../enum/html-pro-program.enum";
import { HtmlProCommandEnum } from "../enum/html-pro-command.enum";
import {
  BuildDefaultProgramService,
  DefaultDefaultProgramService,
  InitDefaultProgramService
} from "@lib/htmlpro-program";

@singleton()
/**
 * The app service is responsible for giving all programs
 * for HtmlPro project.
 */
export class HtmlProLaunchProgramAppService {
  getPrograms(): LauncherModel {
    return {
      programs: [
        {
          programName: HtmlProProgramEnum.default,
          commandName: HtmlProCommandEnum.default,
          service: container.resolve(DefaultDefaultProgramService)
        },
        {
          programName: HtmlProProgramEnum.init,
          commandName: HtmlProCommandEnum.default,
          service: container.resolve(InitDefaultProgramService)
        },
        {
          programName: HtmlProProgramEnum.build,
          commandName: HtmlProCommandEnum.default,
          service: container.resolve(BuildDefaultProgramService)
        }
      ]
    };
  }
}
