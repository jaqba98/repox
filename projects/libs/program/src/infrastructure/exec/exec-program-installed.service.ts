// import { singleton } from "tsyringe";
// import { sync } from "command-exists";
// import { SimpleMessageAppService } from "@lib/logger";
//
// @singleton()
// /**
//  * The service is responsible for verify whether program
//  * is installed.
//  */
// export class ExecProgramInstalledService {
//   constructor(
//     private readonly loggerMessageApp: SimpleMessageAppService
//   ) {
//   }
//
//   exec(program: string): boolean {
//     if (sync(program)) {
//       this.loggerMessageApp.writePlain(
//         `Program ${program} is installed`, 0
//       );
//       return true;
//     }
//     this.loggerMessageApp.writePlain("", 0);
//     this.loggerMessageApp.writeError(
//       `Program ${program} is not installed`, 0
//     );
//     return false;
//   }
// }
// // todo: refactor
