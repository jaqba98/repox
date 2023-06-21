import { singleton } from "tsyringe";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import {
  GenerateProjectCommandArgModel,
  ParamDomainAppService
} from "@lib/param-domain";

@singleton()
/**
 * The program service is responsible for starting the process
 * of generating a new project.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly paramDomain: ParamDomainAppService,
    private readonly generateProjectStep: GenerateProjectStepService
  ) {
  }

  runProgram(): void {
    const commandArg = <GenerateProjectCommandArgModel>
      this.paramDomain.getParamDomain().command.model;
    this.generateProjectStep.runSteps(commandArg);
  }
}
