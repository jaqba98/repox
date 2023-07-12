import { singleton } from "tsyringe";
import {
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
    switch (programName) {
      case RepoxProgramEnum.default:
        return this.buildParamModel.buildDefaultProgramParamModel();
      default:
        return this.buildParamModel.buildEmptyProgramParamModel();
    }
  }

  buildCommandParamModel(): TRepoxCommandModel {
    return {};
  }
}

// todo: refactor
