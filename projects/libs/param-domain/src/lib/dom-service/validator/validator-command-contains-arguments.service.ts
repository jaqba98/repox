// import { singleton } from "tsyringe";
// import {
//   ValidatorDomainModel
// } from "../../model/validator/validator-domain.model";
// import {
//   GetParamDependencyService
// } from "../service/get-param-dependency.service";
// import {
//   BuildParamDomainResultService
// } from "../builder/build-param-domain-result.service";
// import {
//   ParamDomainValidationModel
// } from "../../model/param-domain/param-domain-validation.model";
// import { ProgramEnum } from "../../enum/program.enum";
// import { CommandEnum } from "../../enum/command.enum";
// import {
//   ParamDomainDepModel
// } from "../../model/param-domain/param-domain-dep.model";
// import {
//   ParamDomainStoreService
// } from "../store/param-domain-store.service";
//
// @singleton()
// /**
//  * The validator is responsible for checking that the given command
//  * contains all required arguments.
//  */
// export class ValidatorCommandContainsArgumentsService
//   implements ValidatorDomainModel {
//   constructor(
//     private readonly getParamDependency: GetParamDependencyService,
//     private readonly buildParamDomain: BuildParamDomainResultService,
//     private readonly paramDomainStore: ParamDomainStoreService
//   ) {
//   }
//
//   runValidator(): ParamDomainValidationModel {
//     const paramDomain = this.paramDomainStore.getParamDomain();
//     const programName: ProgramEnum = paramDomain.program.name;
//     const commandName: CommandEnum = paramDomain.command.name;
//     const programDep: ParamDomainDepModel = this.getParamDependency
//       .getDependency(programName);
//     const command = programDep.commands[commandName];
//     const commandArgs = command.args;
//     const wrongArgs = Object.values(commandArgs)
//       .filter(commandArg => commandArg.required)
//       .filter(commandArg => !paramDomain.command.args
//         .find(arg => arg.name === commandArg.name)
//       );
//     if (wrongArgs.length === 0) {
//       return this.buildParamDomain.buildSuccess();
//     }
//     const missingArgs = wrongArgs.map(arg => arg.name).join(',');
//     return this.buildParamDomain.buildError(
//       [],
//       ["You have not specified all required arguments for command!"],
//       [
//         "You have to specify required arguments.",
//         `Missing arguments for command are: ${missingArgs}`
//       ]
//     );
//   }
// }
// // todo: refactor
