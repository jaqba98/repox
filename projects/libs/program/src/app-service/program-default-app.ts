// import { singleton } from "tsyringe";
// import {
//   ParamDomainModel
// } from "../../model/param-domain/param-domain-model";
// import {
//   BuildCommandModel
// } from "../../dom-service/builder/build-command-model";
// import {
//   ProgramDefaultModel
// } from "../../model/command/program-default-model";
// import { LoggerService } from "../../logger/src/lib/service/logger.service";
// import {
//   buildInfoMsg
// } from "../../logger/src/lib/builder/base-msg-builder";
// import { SYSTEM_VERSION } from "../../const/domain.const";
//
// /**
//  * The command service is responsible for run command default.
//  */
// @singleton()
// export class ProgramDefaultApp {
//   constructor(
//     private readonly buildCommandModel: BuildCommandModel,
//     private readonly writeLog: LoggerService
//   ) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     const model: ProgramDefaultModel = this.buildCommandModel
//       .buildProgramDefaultModel(paramDomain);
//     if (model.version) {
//       this.writeLog.write(buildInfoMsg(SYSTEM_VERSION));
//       return;
//     }
//   }
// }
