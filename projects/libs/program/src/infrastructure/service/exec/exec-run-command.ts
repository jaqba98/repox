// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { ExecCommand } from "./exec-program";
// import { buildInfoMsg } from "../../../logger/src/lib/builder/base-msg-builder";
//
// /**
//  * The service is responsible for run bash program.
//  */
// @singleton()
// export class ExecRunCommand {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(program: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Run the >>> ${program} <<< program`
//     ));
//     this.execCommand.exec(program);
//     return true;
//   }
// }
// todo: refactor