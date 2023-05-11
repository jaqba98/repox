// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { ExecCommand } from "./exec-command";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
//
// /**
//  * The service is responsible for create folder by name.
//  */
// @singleton()
// export class ExecCreateFolder {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Create the >>> ${name} <<< folder`
//     ));
//     if (this.execCommand.pathExist(name)) {
//       this.writeLog.write(
//         buildErrMsg(`The folder already exists!`)
//       );
//       return false;
//     }
//     this.execCommand.createFolder(name);
//     return true;
//   }
// }
// todo: refactor