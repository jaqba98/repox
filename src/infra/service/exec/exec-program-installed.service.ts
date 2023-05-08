// import { singleton } from "tsyringe";
// import { WriteLog } from "../writer/write-log.service";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../builder/message/base-msg-builder.service";
// import { sync } from "command-exists";
//
// @singleton()
// /**
//  * The service is responsible for verify whether command
//  * is installed.
//  */
// export class ExecProgramInstalledService {
//   constructor(
//     private readonly writeLog: WriteLog
//   ) {
//   }
//
//   exec(command: string): boolean {
//     this.writeLog.message(buildInfoMsg(
//       `Verify that the ${command} is installed`
//     ));
//     if (!sync(command)) {
//       this.writeLog.message(
//         buildErrMsg(`The ${command} is not installed`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
// todo: refactor this