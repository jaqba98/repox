import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import { BaseGetParamDepModel } from "@lib/model";
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
  constructor(
    private readonly htmlProGetParamDep: HtmlProGetParamDepService
  ) {
  }

  getDependency(program: string): ParamDomainDepModel {
    switch (program) {
      case HtmlProProgramEnum.default:
        return this.htmlProGetParamDep.getProgramDefault();
      case HtmlProProgramEnum.build:
        return this.htmlProGetParamDep.getProgramBuild();
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}
