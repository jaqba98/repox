// import { singleton } from "tsyringe";
// import {
//   GIT_IGNORE_DEFAULT,
//   REPOX_CONFIG_DEFAULT,
//   TSCONFIG_DEFAULT,
//   TSCONFIG_PROJECT
// } from "../const/default-domain.const";
// import { DomainDtoModel } from "../model/dto-model/domain-dto.model";
// import {
//   TsconfigDtoModel
// } from "../model/dto-model/tsconfig-dto.model";
//
// @singleton()
// /**
//  * The service is responsible for building default content
//  * for all domain files.
//  */
// export class BuildDefaultDomainAppService {
//   buildGitIgnore(): string {
//     return GIT_IGNORE_DEFAULT;
//   }
//
//   buildTsconfig(): TsconfigDtoModel {
//     return TSCONFIG_DEFAULT;
//   }
//
//   buildTsconfigProject(path: string): TsconfigDtoModel {
//     const baseTsconfigPath = path
//       .split("/")
//       .map(() => "..")
//       .join("/")
//       .concat("/tsconfig.json");
//     return TSCONFIG_PROJECT(baseTsconfigPath);
//   }
//
//   buildRepoxConfig(): DomainDtoModel {
//     return REPOX_CONFIG_DEFAULT;
//   }
// }
//
// // todo: refactor
