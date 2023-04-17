// import { singleton } from "tsyringe";
// import {
//   ParamDomainModel
// } from "../model/param-domain/param-domain.model";
// import { ArgumentEnum } from "../enum/argument.enum";
// import {
//   ProjectGenerateService
// } from "../infra/service/generate/project-generate.service";
//
// @singleton()
// /**
//  * The service is responsible for generate project.
//  */
// export class GenerateProjectAppService {
//   constructor(
//     private readonly projectGenerate: ProjectGenerateService
//   ) {
//   }
//
//   run(paramDomain: ParamDomainModel): void {
//     const commandArgs = this.getCommandArgs(paramDomain);
//     commandArgs.name
//       .forEach(name => this.projectGenerate.generate(name, <any>commandArgs.type));
//   }
//
//   private getCommandArgs(paramDomain: ParamDomainModel): {
//     name: Array<string>,
//     type: string
//   } {
//     const { args } = paramDomain.command;
//     const argName = args.find(arg => arg.name === ArgumentEnum.name);
//     const argType = args.find(arg => arg.name === ArgumentEnum.type);
//     return {
//       name: argName?.values ?? [],
//       type: argType?.values[0] ?? "",
//     };
//   }
// }
// // todo: fix it