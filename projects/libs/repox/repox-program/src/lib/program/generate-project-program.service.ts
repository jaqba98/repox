import { singleton } from "tsyringe";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import { ParamDomainAppService } from "@lib/param-domain";
// import { ProjectAppService } from "@lib/workspace";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The program service is responsible for starting the process
 * of generating a new project.
 */
export class GenerateProjectProgramService implements RunProgramModel {
  constructor(
    private readonly generateProjectStep: GenerateProjectStepService,
    private readonly paramDomain: ParamDomainAppService
    // private readonly project: ProjectAppService
  ) {
  }

  runProgram(): void {
    console.log("GenerateProjectProgramService");
    // const stepData = this.prepareStepData();
    // this.generateProjectStep.runSteps(stepData);
  }

  // private prepareStepData(): GenerateProjectProgramModel {
  //   const commandArg = <any>undefined;
  //     // this.paramDomain.getParamDomain().command.model;
  //   const { name, type, path, scheme } = commandArg;
  //   return {
  //     projectName: name,
  //     projectType: this.project.getProjectType(type),
  //     projectPath: this.project.getProjectPath(name, type, path),
  //     projectAlias: this.project.getProjectAlias(name, type),
  //     projectScheme: this.project.getProjectScheme(scheme)
  //   }
  // }
}
// todo: refactor
