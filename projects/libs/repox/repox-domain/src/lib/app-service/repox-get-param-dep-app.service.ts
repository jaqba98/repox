import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import { BaseGetParamDepModel } from "@lib/model";
import {
  RepoxGetParamDepService
} from "../dom-service/repox-get-param-dep.service";
import { RepoxProgramEnum } from "@lib/repox-domain";

@singleton()
/**
 * The app service is responsible for getting dependency between
 * programs, commands, and arguments.
 */
export class RepoxGetParamDepAppService
  implements BaseGetParamDepModel {
  constructor(
    private readonly repoxGetParamDep: RepoxGetParamDepService
  ) {
  }

  getDependency(program: string): ParamDomainDepModel {
    switch (program) {
      case RepoxProgramEnum.default:
        return this.repoxGetParamDep.getProgramDefault();
      case RepoxProgramEnum.generate:
        return this.repoxGetParamDep.getProgramGenerate();
      case RepoxProgramEnum.build:
        return this.repoxGetParamDep.getProgramBuild();
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}