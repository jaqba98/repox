import { singleton } from "tsyringe";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import {
  GenerateProjectCommandArgModel,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  GenerateProjectProgramModel
} from "../model/program/generate-project-program.model";
import { GetProjectDataAppService } from "@lib/workspace";

@singleton()
/**
 * The program service is responsible for starting the process
 * of generating a new project.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly generateProjectStep: GenerateProjectStepService,
    private readonly paramDomain: ParamDomainAppService,
    private readonly getProjectData: GetProjectDataAppService
  ) {
  }

  runProgram(): void {
    const stepData = this.prepareStepData();
    this.generateProjectStep.runSteps(stepData);
  }

  private prepareStepData(): GenerateProjectProgramModel | any {
    const commandArg = <GenerateProjectCommandArgModel>
      this.paramDomain.getParamDomain().command.model;
    const { name, type, path, scheme } = commandArg;
    return {
      projectName: name,
      projectType: this.getProjectData.getProjectType(type),
      projectPath: this.getProjectData.getProjectPath(
        name, type, path
      ),
      projectAlias: this.getProjectData.getProjectAlias(name, type),
      projectScheme: this.getProjectData.getProjectScheme(scheme)
    }
  }
}
