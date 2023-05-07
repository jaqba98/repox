// import { singleton } from "tsyringe";
// import {
//   ValidatorDomainModel
// } from "../../model/validator-domain/validator-domain.model";
// import {
//   BuildParamDomainValidation
// } from "../builder/build-param-domain-validation";
// import {
//   BaseFieldModel,
//   ParamDomainModel
// } from "../../model/param-domain/param-domain-model";
// import {
//   ParamDependencyCommandModel,
//   ParamDependencyModel
// } from "../../model/param-domain/param-dependency-model";
// import {
//   ParamDomainValidationModel
// } from "../../model/param-domain/param-domain-validation-model";
//
// @singleton()
// /**
//  * The validator is responsible for checking that
//  * the given command arguments are correct.
//  */
// export class CommandArgsValidatorService
//   implements ValidatorDomainModel {
//   constructor(
//     private readonly buildParam: BuildParamDomainValidation
//   ) {
//   }
//
//   runValidator(
//     paramDomain: ParamDomainModel,
//     program: ParamDependencyModel,
//     command: ParamDependencyCommandModel
//   ): ParamDomainValidationModel {
//     const commandArgs = command?.args ?? {};
//     const domainArgs = Object.values(paramDomain.command.args)
//       .map(domainArg => <BaseFieldModel>domainArg);
//     const missingCommandsArgs = Object.values(commandArgs)
//       .filter(arg => arg.required)
//       .filter(arg => domainArgs.find(domainArg =>
//         domainArg.name === arg.name && domainArg.index === undefined)
//       )
//       .map(arg => arg.name);
//     if (missingCommandsArgs.length > 0) {
//       return this.buildParam.buildError(
//         [],
//         ["You have not specified required arguments for command!"],
//         [
//           "You have to specify all required arguments.",
//           `Missing arguments: ${missingCommandsArgs.join(",")}`
//         ],
//         paramDomain
//       );
//     }
//     return this.buildParam.buildSuccess(paramDomain);
//   }
// }
// todo: refactor this