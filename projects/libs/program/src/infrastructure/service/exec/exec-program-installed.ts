// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
// import { sync } from "program-exists";
//
// /**
//  * The service is responsible for verify whether program
//  * is installed.
//  */
// @singleton()
// export class ExecProgramInstalled {
//   constructor(private readonly writeLog: LoggerService) {
//   }
//
//   exec(program: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Verify that the ${program} is installed`
//     ));
//     if (!sync(program)) {
//       this.writeLog.write(
//         buildErrMsg(`The ${program} is not installed`)
//       );
//       return false;
//     }
//     return true;
//   }
// }
// todo: refactor