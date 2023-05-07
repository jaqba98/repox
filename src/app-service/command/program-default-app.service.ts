// import { singleton } from "tsyringe";
// import {
//   EmptyArgsModel,
//   ProgramDefaultArgsModel
// } from "../../model/param-domain/param-domain-model";
// import {
//   ExecGetCurrentVersionService
// } from "../../infra/service/exec/exec-get-current-version.service";
//
// @singleton()
// /**
//  * The service is responsible for run program default.
//  */
// export class ProgramDefaultAppService {
//   constructor(
//     private readonly getCurrentVersion: ExecGetCurrentVersionService
//   ) {
//   }
//   run(
//     programArgs: ProgramDefaultArgsModel,
//     commandArgs: EmptyArgsModel
//   ): void {
//     this.getCurrentVersion.getCurrentVersion(
//       programArgs.version,
//       programArgs.clean
//     );
//   }
// }
