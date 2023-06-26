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
// import { ProjectAppService } from "@lib/domain";

@singleton()
/**
 * The program service is responsible for starting the process
 * of generating a new project.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly generateProjectStep: GenerateProjectStepService,
    private readonly paramDomain: ParamDomainAppService,
    // private readonly project: ProjectAppService
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
      // projectType: this.project.getProjectType(type),
      // projectPath: this.project.getProjectPath(name, type, path),
      // projectAlias: this.project.getProjectAlias(name, type),
      // projectScheme: this.project.getProjectScheme(scheme)
    }
  }
}

// todo: refactor
