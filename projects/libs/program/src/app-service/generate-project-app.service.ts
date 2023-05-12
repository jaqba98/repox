import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/parameter";
import {
  BuildProgramModelService
} from "../dom-service/build-program-model.service";
import {
  GenerateProjectModel
} from "../model/program/program-argument.model";

@singleton()
/**
 * The program service is responsible for run program
 * generate project.
 */
export class GenerateProjectAppService {
  constructor(
    private readonly buildCommandModel: BuildProgramModelService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateProjectModel = this.buildCommandModel
      .buildGenerateProjectModel(paramDomain);
  }
}
