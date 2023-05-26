// import { singleton } from "tsyringe";
// import {
//   BuildEmptyDomainConfigFileService
// } from "../dom-service/builder/build-empty-domain-config-file.service";
// import { DomainConfigModel } from "@lib/domain";
//
// @singleton()
// /**
//  * The app service which is responsible for building domain config
//  * file for repox.
//  */
// export class BuildDomainConfigFileAppService {
//   constructor(
//     private readonly buildEmpty: BuildEmptyDomainConfigFileService
//   ) {
//   }
//
//   buildEmptyDomainConfig(): DomainConfigModel {
//     return this.buildEmpty.buildConfigFile();
//   }
// }
// // todo: refactor