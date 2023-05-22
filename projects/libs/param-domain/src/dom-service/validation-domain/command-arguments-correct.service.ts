// import { singleton } from "tsyringe";
// import {
//   ValidatorDomainModel
// } from "../../model/validator/validator-domain.model";
// import {
//   BuildParamDomainResultService
// } from "../builder/build-param-domain-result.service";
// import {
//   ParamDomainArgumentModel,
//   ParamDomainModel
// } from "../../model/param-domain/param-domain.model";
// import {
//   ParamDomainValidationModel
// } from "../../model/param-domain/param-domain-validation.model";
// import {
//   GetParamDependencyService
// } from "../service/get-param-dependency.service";
// import {
//   ParamDependencyArgsModel,
//   ParamDependencyModel
// } from "../../model/param-domain/param-dependency.model";
// import { ProgramEnum } from "../../enum/program.enum";
// import { CommandEnum } from "../../enum/command.enum";
// import { ArgumentEnum } from "../../enum/argument.enum";
//
// @singleton()
// /**
//  * The validator is responsible for checking that the given program
//  * arguments are correct.
//  */
// export class CommandArgumentsCorrectService
//   implements ValidatorDomainModel {
//   constructor(
//     private readonly getParamDependency: GetParamDependencyService,
//     private readonly buildParamDomain: BuildParamDomainResultService
//   ) {
//   }
//
//   runValidator(
//     paramDomain: ParamDomainModel,
//   ): ParamDomainValidationModel {
//     const programName: ProgramEnum = paramDomain.program.name;
//     const commandName: CommandEnum = paramDomain.command.name;
//     const programDep: ParamDependencyModel = this.getParamDependency
//       .getDependency(programName);
//     const commandArgs = programDep.commands[commandName].args;
//     const wrongArgs = paramDomain.command.args
//       .filter(arg => arg.name !== ArgumentEnum.unknown)
//       .filter(arg => !this.checkCommandArgs(arg, commandArgs));
//     if (wrongArgs.length === 0) {
//       return this.buildParamDomain.buildSuccess(paramDomain);
//     }
//     return this.buildParamDomain.buildError(
//       [...wrongArgs.map(arg => arg.index)],
//       ["Given arguments have not correct values!"],
//       [
//         "Check the documentation to get full list of arguments."
//       ],
//       paramDomain
//     );
//   }
//
//   private checkCommandArgs(
//     commandArg: ParamDomainArgumentModel,
//     commandArgs: ParamDependencyArgsModel
//   ): boolean {
//     const depArg = commandArgs[commandArg.name];
//     if (depArg.valueMode === "empty") {
//       return commandArg.values.length === 0;
//     }
//     if (depArg.valueMode === "single") {
//       return commandArg.values.length === 1;
//     }
//     return commandArg.values.length > 1;
//   }
// }
// // todo: refactor