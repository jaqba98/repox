// import { singleton } from "tsyringe";
// import {
//   BuildProgramModelService
// } from "../dom-service/build-program-model.service";
// import {
//   ProgramDefaultStepService
// } from "../step/program-default-step.service";
// import { SimpleMessageAppService } from "@lib/logger";
// import { ParamDomainModel } from "@lib/parameter";
// import {
//   ProgramDefaultModel
// } from "../model/program/program-argument.model";
//
// @singleton()
// /**
//  * The start point of the program default.
//  */
// export class ProgramDefaultProgramService {
//   constructor(
//     private readonly buildCommandModel: BuildProgramModelService,
//     private readonly programDefaultStep: ProgramDefaultStepService,
//     private readonly loggerMessageApp: SimpleMessageAppService
//   ) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     const model: ProgramDefaultModel = this.buildCommandModel
//       .buildProgramDefaultModel(paramDomain);
//     const { version } = model;
//     if (this.programDefaultStep.runSteps(version)) return;
//     this.loggerMessageApp.writeError(
//       "An error occurred while executing the command!", 0
//     );
//   }
// }
// // todo: refactor
