// import { singleton } from "tsyringe";
// import {
//   ParamDomainModel
// } from "../../model/param-domain/param-domain-model";
// import { LoggerService } from "../../logger/src/lib/service/logger.service";
// import {
//   msgRunCommandInfo
// } from "../../logger/src/lib/builder/info-msg-builder.service";
//
// /**
//  * The command service is responsible for run command
//  * generate project.
//  */
// @singleton()
// export class GenerateProjectApp {
//   constructor(private readonly writeLog: LoggerService) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     this.writeLog.write(msgRunCommandInfo("generate project"));
//   }
// }
// todo: refactor