// import { singleton } from "tsyringe";
// import { WriteLogService } from "../writer/write-log.service";
// import { ExecCommand } from "./exec-command";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../builder/message/base-msg-builder.service";
//
// @singleton()
// /**
//  * The service is responsible for create folder by name.
//  */
// export class ExecCreateFolderService {
//   constructor(
//     private readonly writeLog: WriteLogService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.message(buildInfoMsg(
//       `Create the >>> ${name} <<< folder`
//     ));
//     if (this.execCommand.pathExist(name)) {
//       this.writeLog.message(
//         buildErrMsg(`The folder already exists!`)
//       );
//       return false;
//     }
//     this.execCommand.createFolder(name);
//     return true;
//   }
// }
