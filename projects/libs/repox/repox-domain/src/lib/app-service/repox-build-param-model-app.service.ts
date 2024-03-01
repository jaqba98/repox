import {singleton} from "tsyringe";
import {
  RepoxBuildParamModelService
} from "../dom-service/repox-build-param-model.service";
import {type TRepoxProgramModel} from "../model/repox-program.model";
import {type TRepoxCommandModel} from "../model/repox-command.model";

@singleton()
/**
 * The app service is responsible for building repox param model
 * for given program and command.
 */
export class RepoxBuildParamModelAppService {
  constructor (
    private readonly buildParamModel: RepoxBuildParamModelService
    // private readonly paramDom: ParamDomainAppService
  ) {
  }

  buildProgramParamModel (): TRepoxProgramModel {
    // enum programName = this.paramDom.getParamDomain().program.name;
    // if (programName === RepoxProgramEnum.default) {
    //   return this.buildParamModel.defaultProgram();
    // }
    // if (programName === RepoxProgramEnum.build) {
    //   return this.buildParamModel.defaultProgram();
    // }
    return this.buildParamModel.emptyProgram();
  }

  buildCommandParamModel (): TRepoxCommandModel {
    // enum programName = this.paramDom.getParamDomain().program.name;
    // enum commandName = this.paramDom.getParamDomain().command.name;
    // if (programName === RepoxProgramEnum.generate) {
    //   if (commandName === RepoxCommandEnum.workspace) {
    //     return this.buildParamModel.generateWorkspaceCommand();
    //   }
    //   if (commandName === RepoxCommandEnum.project) {
    //     return this.buildParamModel.generateProjectCommand();
    //   }
    // }
    // if (programName === RepoxProgramEnum.regenerate) {
    //   if (commandName === RepoxCommandEnum.workspace) {
    //     return this.buildParamModel.regenerateWorkspaceCommand();
    //   }
    // }
    // if (programName === RepoxProgramEnum.build) {
    //   if (commandName === RepoxCommandEnum.project) {
    //     return this.buildParamModel.buildProjectCommand();
    //   }
    // }
    // if (programName === RepoxProgramEnum.publish) {
    //   if (commandName === RepoxCommandEnum.npm) {
    //     return this.buildParamModel.publishNpmCommand();
    //   }
    // }
    // if (programName === RepoxProgramEnum.lint) {
    //   if (commandName === RepoxCommandEnum.project) {
    //     return this.buildParamModel.lintProjectCommand();
    //   }
    // }
    return this.buildParamModel.emptyCommand();
  }
}

// todo: refactor the code
