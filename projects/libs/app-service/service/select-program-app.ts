// import { ProgramEnum } from "../../enum/program";
// import { container, singleton } from "tsyringe";
// import {
//   ParamDomainModel
// } from "../../model/param-domain/param-domain-model";
// import { CommandEnum } from "../../enum/command";
// import { ProgramDefaultApp } from "../command/program-default-app";
// import {
//   GenerateWorkspaceApp
// } from "../command/generate-workspace-app";
// import { GenerateProjectApp } from "../command/generate-project-app";
//
// /**
//  * The service is responsible for select service to run by given
//  * command name and command name.
//  */
// @singleton()
// export class SelectProgramApp {
//   selectProgram(paramDomain: ParamDomainModel): void {
//     const runProgram: string = this.getRunProgramName(paramDomain);
//     switch (runProgram) {
//       case `${ProgramEnum.default}-${CommandEnum.default}`:
//         container.resolve(ProgramDefaultApp).run(paramDomain);
//         return;
//       case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
//         container.resolve(GenerateWorkspaceApp).run(paramDomain);
//         return;
//       case `${ProgramEnum.generate}-${CommandEnum.project}`:
//         container.resolve(GenerateProjectApp).run(paramDomain);
//         return;
//       default:
//         throw new Error("Not found implementation for given action!");
//     }
//   }
//
//   private getRunProgramName(paramDomain: ParamDomainModel): string {
//     return `${paramDomain.program.name}-${paramDomain.command.name}`;
//   }
// }
