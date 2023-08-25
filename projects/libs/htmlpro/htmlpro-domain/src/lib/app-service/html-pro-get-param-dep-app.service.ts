import { singleton } from "tsyringe";
import { type ParamDomainDepModel } from "@lib/param-domain";
import { type BaseGetParamDepModel } from "@lib/model";
import {
  HtmlProGetParamDepService
} from "../dom-service/html-pro-get-param-dep.service";
import { HtmlProProgramEnum } from "../enum/html-pro-program.enum";

@singleton()
/**
 * The app service is responsible for getting dependency between
 * programs, commands, and arguments.
 */
export class HtmlProGetParamDepAppService
implements BaseGetParamDepModel {
  constructor (
    private readonly htmlProGetParamDep: HtmlProGetParamDepService
  ) {
  }

  getDependency (program: string): ParamDomainDepModel {
    switch (program) {
      case HtmlProProgramEnum.default:
        return this.htmlProGetParamDep.getProgramDefault();
      case HtmlProProgramEnum.init:
        return this.htmlProGetParamDep.getProgramInit();
      case HtmlProProgramEnum.build:
        return this.htmlProGetParamDep.getProgramBuild();
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}
// todo: refactor the file
