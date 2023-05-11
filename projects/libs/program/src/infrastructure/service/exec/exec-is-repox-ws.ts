// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { singleton } from "tsyringe";
// import { ExecCommand } from "./exec-program";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
// import { ConfigFileEnum } from "../../enum/config-file";
//
// /**
//  * The service is responsible for verify whether current directory
//  * is a monorepo repox workspace.
//  */
// @singleton()
// export class ExecIsRepoxWs {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Verify that the >>> ${name} <<< is a monorepo repox workspace`
//     ));
//     if (this.execCommand.pathExist(ConfigFileEnum.configJson)) {
//       this.writeLog.write(
//         buildErrMsg(`The ${ConfigFileEnum.configJson} already exists!`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
// todo: refactor