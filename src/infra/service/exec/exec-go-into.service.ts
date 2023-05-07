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
//  * The service is responsible go into selected folder.
//  */
// export class ExecGoIntoService {
//   constructor(
//     private readonly writeLog: WriteLogService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(name: string): boolean {
//     this.writeLog.message(buildInfoMsg(
//       `Go into the >>> ${name} <<< folder`
//     ));
//     if (!this.execCommand.pathExist(name)) {
//       this.writeLog.message(
//         buildErrMsg(`The folder not exists!`)
//       );
//       return false;
//     }
//     this.execCommand.cd(name);
//     return true;
//   }
// }
// todo: refactor this