// import { singleton } from "tsyringe";
// import {
//   BaseFieldModel
// } from "../../../model/param-domain/param-domain-model";
// import { WriteLog } from "../writer/write-log.service";
// import { SYSTEM_VERSION } from "../../../const/domain.const";
// import {
//   buildInfoMsg
// } from "../builder/message/base-msg-builder.service";
//
// @singleton()
// /**
//  * The service is responsible for get current version of program.
//  * */
// export class ExecGetCurrentVersionService {
//   constructor(
//     private readonly writeLog: WriteLog
//   ) {
//   }
//
//   getCurrentVersion(
//     version: BaseFieldModel,
//     clean: BaseFieldModel
//   ): void {
//     if (!version.isDefined) return;
//     clean.isDefined ?
//       this.writeLog.message(SYSTEM_VERSION) :
//       this.writeLog.message(buildInfoMsg(SYSTEM_VERSION));
//   }
// }
// todo: refactor this