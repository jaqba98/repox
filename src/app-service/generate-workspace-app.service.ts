// import { singleton } from "tsyringe";
// import {
//   ParamDomainModel
// } from "../model/param-config/param-config.model";
// import { ArgumentEnum } from "../enum/argument.enum";
// import {
//   WorkspaceGenerateService
// } from "../infra/service/generate/workspace-generate.service";
//
// @singleton()
// /**
//  * The service is responsible for generate workspace.
//  */
// export class GenerateWorkspaceAppService {
//   constructor(
//     private readonly workspaceGenerate: WorkspaceGenerateService
//   ) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     const commandArgs = this.getCommandArgs(paramDomain);
//     commandArgs.name
//       .forEach(name => this.workspaceGenerate.generate(name));
//   }
//
//   private getCommandArgs(paramDomain: ParamDomainModel): {
//     name: Array<string>
//   } {
//     const { args } = paramDomain.command;
//     const argName = args.find(arg => arg.name === ArgumentEnum.name);
//     return {
//       name: argName?.values ?? []
//     };
//   }
// }
// // todo: fix it