// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { singleton } from "tsyringe";
// import { ExecCommand } from "./exec-command";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
//
// /**
//  * The service is responsible for verify whether folder by name
//  * not exists.
//  */
// @singleton()
// export class ExecFolderDoesNotExist {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Verify that the >>> ${name} <<< folder exists`
//     ));
//     if (this.execCommand.pathExist(name)) {
//       this.writeLog.write(
//         buildErrMsg(`The folder already exists!`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
