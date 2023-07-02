// import { singleton } from "tsyringe";
// import { FileUtilsService } from "@lib/utils";
// import { DomainFileEnum } from "../../enum/domain-file.enum";
// import {
//   BuildProjectSchemeAppService
// } from "../../app-service/build-project-scheme-app.service";
// import { DomainTypeEnum } from "../../enum/domain-type.enum";
// import { DomainExecutorEnum } from "../../enum/domain-executor.enum";
// import {
//   DomainDtoModel
// } from "../../model/dto-model/domain-dto.model";
// import {
//   TsconfigDtoModel
// } from "../../model/dto-model/tsconfig-dto.model";
//
// @singleton()
// /**
//  * The store of domain configuration, which is used to read,
//  * write and modify the domain configuration.
//  */
// export class DomainConfigStoreService {
//   private config: any | undefined;
//
//   constructor(
//     private readonly readFile: FileUtilsService,
//     private readonly writeFile: FileUtilsService,
//     private readonly buildProjectScheme: BuildProjectSchemeAppService
//   ) {
//     this.config = undefined;
//   }
//
//   loadConfig(): void {
//     this.config = {
//       repoxDomain: this.readFile.readJsonFile<DomainDtoModel>(
//         DomainFileEnum.domainJson
//       ),
//       tsconfigDomain: this.readFile.readJsonFile<TsconfigDtoModel>(
//         DomainFileEnum.tsconfigJson
//       )
//     }
//   }
//
//   saveConfig(): void {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     this.writeFile.writeJsonFile(
//       DomainFileEnum.domainJson, this.config.repoxDomain
//     );
//     this.writeFile.writeJsonFile(
//       DomainFileEnum.tsconfigJson, this.config.tsconfigDomain
//     );
//   }
//
//   existProject(projectName: string): boolean {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     return Boolean(
//       Object.values(this.config.repoxDomain.projects)
//         .find((project: any) => project.name === projectName)
//     );
//   }
//
//   existAlias(projectAlias: string): boolean {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     return Boolean(
//       this.config.tsconfigDomain.compilerOptions.paths[projectAlias]
//     );
//   }
//
//   addProject(
//     projectName: string,
//     projectType: DomainTypeEnum,
//     projectPath: string,
//     scheme: DomainExecutorEnum
//   ): void {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     const projectScheme = this.buildProjectScheme.buildScheme(scheme);
//     this.config.repoxDomain.projects[projectName] = {
//       name: projectName,
//       type: projectType,
//       path: projectPath,
//       scheme: projectScheme
//     }
//   }
//
//   addAlias(alias: string, projectPath: string): void {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     this.config
//       .tsconfigDomain
//       .compilerOptions
//       .paths[alias] = [projectPath];
//   }
//
//   getProject(projectName: string): any {
//     if (this.config === undefined) {
//       throw new Error("The domain config store is undefined!");
//     }
//     const project = Object.values(this.config.repoxDomain.projects)
//       .find((project: any) => project.name === projectName);
//     if (project === undefined) {
//       throw new Error("The project not exist!");
//     }
//     return project;
//   }
// }
//
// // todo: refactor
