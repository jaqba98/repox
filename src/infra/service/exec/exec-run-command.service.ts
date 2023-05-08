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
//  * The service is responsible for run bash command.
//  */
// export class ExecRunCommandService {
//   constructor(
//     private readonly writeLog: WriteLog,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(command: string): boolean {
//     this.writeLog.message(buildInfoMsg(
//       `Run the >>> ${command} <<< command`
//     ));
//     this.execCommand.exec(command);
//     return true;
//   }
// }
// todo: refactor this