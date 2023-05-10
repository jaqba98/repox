// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
// import { sync } from "command-exists";
//
// /**
//  * The service is responsible for verify whether command
//  * is installed.
//  */
// @singleton()
// export class ExecProgramInstalled {
//   constructor(private readonly writeLog: LoggerService) {
//   }
//
//   exec(command: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Verify that the ${command} is installed`
//     ));
//     if (!sync(command)) {
//       this.writeLog.write(
//         buildErrMsg(`The ${command} is not installed`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
