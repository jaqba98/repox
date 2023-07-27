import { singleton } from "tsyringe";
import { LauncherModel } from "@lib/launcher";

@singleton()
/**
 * The app service is responsible for giving all programs
 * for htmlpro project.
 */
export class HtmlproLaunchProgramAppService {
  getPrograms(): LauncherModel {
    return {
      programs: []
    };
  }
}
