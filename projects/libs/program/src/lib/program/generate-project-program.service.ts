// import { singleton } from "tsyringe";
// import {
//   BuildProgramModelService
// } from "../dom-service/build-program-model.service";
// import { SimpleMessageAppService } from "@lib/logger";
// import { ParamDomainModel } from "@lib/parameter";
// import {
//   GenerateProjectModel
// } from "../model/program/program-argument.model";
// import {
//   GenerateProjectStepService
// } from "../step/generate-project-step.service";
//
// @singleton()
// /**
//  * The start point of the generate project program.
//  */
// export class GenerateProjectProgramService {
//   constructor(
//     private readonly buildCommandModel: BuildProgramModelService,
//     private readonly loggerMessageApp: SimpleMessageAppService,
//     private readonly generateProjectStep: GenerateProjectStepService
//   ) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     const model: GenerateProjectModel = this.buildCommandModel
//       .buildGenerateProjectModel(paramDomain);
//     if (this.generateProjectStep.runSteps()) {
//       this.loggerMessageApp.writeSuccess(
//         "The command was executed correctly!", 0
//       );
//       return;
//     }
//     this.loggerMessageApp.writeError(
//       "An error occurred while executing the command!", 0
//     );
//   }
// }
// // todo: refactor
