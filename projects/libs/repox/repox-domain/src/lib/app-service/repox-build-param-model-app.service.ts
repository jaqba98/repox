import { singleton } from "tsyringe";
import {
  RepoxCommandEnum,
  RepoxProgramEnum,
  TRepoxCommandModel,
  TRepoxProgramModel
} from "@lib/repox-domain";
import {
  RepoxBuildParamModelService
} from "../dom-service/repox-build-param-model.service";
import { ParamDomainAppService } from "@lib/param-domain";

@singleton()
/**
 * The app service is responsible for building repox param model
 * for given program and command.
 */
export class RepoxBuildParamModelAppService {
  constructor(
    private readonly buildParamModel: RepoxBuildParamModelService,
    private readonly paramDom: ParamDomainAppService
  ) {
  }

  buildProgramParamModel(): TRepoxProgramModel {
    const programName = this.paramDom.getParamDomain().program.name;
    if (programName === RepoxProgramEnum.default) {
      return this.buildParamModel.defaultProgram();
    }
    return this.buildParamModel.emptyProgram();
  }

  buildCommandParamModel(): TRepoxCommandModel {
    const programName = this.paramDom.getParamDomain().program.name;
    const commandName = this.paramDom.getParamDomain().command.name;
    if (programName === RepoxProgramEnum.generate) {
      if (commandName === RepoxCommandEnum.workspace) {
        return this.buildParamModel.generateWorkspaceCommand();
      }
      if (commandName === RepoxCommandEnum.project) {
        return this.buildParamModel.generateProjectCommand();
      }
    }
    if (programName === RepoxProgramEnum.build) {
      if (commandName === RepoxCommandEnum.project) {
        return this.buildParamModel.buildProjectCommand();
      }
    }
    return this.buildParamModel.emptyCommand();
  }
}
