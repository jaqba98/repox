// import { singleton } from "tsyringe";
// import { LoggerService } from "../../../logger/src/lib/service/logger.service";
// import { ExecCommand } from "./exec-command";
// import {
//   buildErrMsg,
//   buildInfoMsg
// } from "../../../logger/src/lib/builder/base-msg-builder";
// import {
//   BuildEmptyConfigFile
// } from "../builder/config/build-empty-config-file";
// import { WriteFile } from "../writer/write-file";
// import {
//   RepoxConfigModel
// } from "../../../model/config/repox-config-model";
//
// /**
//  * The service is responsible for create file by name.
//  */
// @singleton()
// export class ExecCreateFile {
//   constructor(
//     private readonly writeLog: LoggerService,
//     private readonly execCommand: ExecCommand,
//     private readonly buildEmptyConfigFile: BuildEmptyConfigFile,
//     private readonly writeFile: WriteFile
//   ) {
//   }
//
//   exec(fileName: string): boolean {
//     this.writeLog.write(buildInfoMsg(
//       `Create the >>> ${fileName} <<< file`
//     ));
//     if (this.execCommand.pathExist(fileName)) {
//       this.writeLog.write(
//         buildErrMsg(`The file already exists!`)
//       );
//       return false;
//     }
//     this.execCommand.createFile(fileName);
//     this.writeFile.writeJsonFile<RepoxConfigModel>(
//       fileName,
//       this.buildEmptyConfigFile.buildConfigFile()
//     );
//     return true;
//   }
// }
