import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import { BaseGetParamDepModel } from "@lib/model";
import {
  HtmlproGetParamDepService
} from "../dom-service/htmlpro-get-param-dep.service";
import { HtmlProProgramEnum } from "../enum/html-pro-program.enum";

@singleton()
/**
 * The app service is responsible for getting dependency between
 * programs, commands, and arguments.
 */
export class HtmlproGetParamDepAppService
  implements BaseGetParamDepModel {
  constructor(
    private readonly htmlproGetParamDep: HtmlproGetParamDepService
  ) {
  }

  getDependency(program: string): ParamDomainDepModel {
    switch (program) {
      case HtmlProProgramEnum.default:
        return this.htmlproGetParamDep.getProgramDefault();
      case HtmlProProgramEnum.build:
        return this.htmlproGetParamDep.getProgramBuild();
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}
