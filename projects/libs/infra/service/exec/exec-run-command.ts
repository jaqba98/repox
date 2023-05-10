// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { ExecCommand } from "./exec-command";
// import { buildInfoMsg } from "../../../logger/src/lib/builder/base-msg-builder";
//
// /**
//  * The service is responsible for run bash command.
//  */
// @singleton()
// export class ExecRunCommand {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand
//   ) {
//   }
//
//   exec(command: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Run the >>> ${command} <<< command`
//     ));
//     this.execCommand.exec(command);
//     return true;
//   }
// }
