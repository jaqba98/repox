// import { singleton } from "tsyringe";
// import { WriteLog } from "../writer/write-log.service";
// import { ExecCommand } from "./exec-command";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../builder/message/base-msg-builder.service";
//
// @singleton()
// /**
//  * The service is responsible for verify whether folder by name
//  * not exists.
//  */
// export class ExecFolderDoesNotExistService {
//   constructor(
//     private readonly writeLog: WriteLog,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.message(buildInfoMsg(
//       `Verify that the >>> ${name} <<< folder exists`
//     ));
//     if (this.execCommand.pathExist(name)) {
//       this.writeLog.message(
//         buildErrMsg(`The folder already exists!`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
// todo: refactor this