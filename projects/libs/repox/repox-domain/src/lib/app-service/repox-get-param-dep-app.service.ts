/* eslint-disable @typescript-eslint/no-explicit-any */
import { singleton } from 'tsyringe';
import { type BaseGetParamDepModel } from '@lib/model';
import {
  RepoxGetParamDepService
} from '../dom-service/repox-get-param-dep.service';
import { RepoxProgramEnum } from '@lib/repox-domain';

@singleton()
/**
 * The app service is responsible for getting dependency between
 * programs, commands, and arguments.
 */
export class RepoxGetParamDepAppService
implements BaseGetParamDepModel {
  constructor (
    private readonly repoxGetParamDep: RepoxGetParamDepService
  ) {
  }

  getDependency (program: string): any {
    switch (program) {
      case RepoxProgramEnum.default:
        return this.repoxGetParamDep.getProgramDefault();
      case RepoxProgramEnum.generate:
        return this.repoxGetParamDep.getProgramGenerate();
      case RepoxProgramEnum.regenerate:
        return this.repoxGetParamDep.getProgramRegenerate();
      case RepoxProgramEnum.build:
        return this.repoxGetParamDep.getProgramBuild();
      case RepoxProgramEnum.publish:
        return this.repoxGetParamDep.getProgramPublish();
      case RepoxProgramEnum.lint:
        return this.repoxGetParamDep.getProgramLint();
      default:
        throw new Error(`No dependencies for ${program} program!`);
    }
  }
}

// todo: refactor the code
