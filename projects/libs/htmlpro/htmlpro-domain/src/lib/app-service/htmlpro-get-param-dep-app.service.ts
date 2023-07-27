import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import { BaseGetParamDepModel } from "@lib/model";
import {
  HtmlproGetParamDepService
} from "../dom-service/htmlpro-get-param-dep.service";
import { HtmlproProgramEnum } from "../enum/htmlpro-program.enum";

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
      case HtmlproProgramEnum.build:
        return this.htmlproGetParamDep.getProgramBuild()
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}
