import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  BuildCommandModel
} from "../../dom-service/builder/build-command-model";
import {
  GenerateWorkspaceModel
} from "../../model/command/program-default-model";

/**
 * The command service is responsible for run command
 * generate workspace.
 */
@singleton()
export class GenerateWorkspaceApp {
  constructor(
    private readonly buildCommandModel: BuildCommandModel
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateWorkspaceModel = this.buildCommandModel
      .buildGenerateWorkspaceModel(paramDomain);
    console.log(model);
  }
}
