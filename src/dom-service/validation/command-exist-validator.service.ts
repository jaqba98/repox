// import { singleton } from "tsyringe";
// import {
//   ValidatorDomainModel
// } from "../../model/validator-domain/validator-domain.model";
// import {
//   BuildParamDomainValidation
// } from "../builder/build-param-domain-validation";
// import {
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
//  * the given command exist.
//  */
// export class CommandExistValidatorService
//   implements ValidatorDomainModel {
//   constructor(
//     private readonly buildParam: BuildParamDomainValidation
//   ) {
//   }
//
//   runValidator(
//     paramDomain: ParamDomainModel,
//     paramDep: ParamDependencyModel,
//     command: ParamDependencyCommandModel
//   ): ParamDomainValidationModel {
//     if (!command) {
//       return this.buildParam.buildError(
//         [paramDomain.command.index],
//         ["You have specified not existed command for given program!"],
//         [
//           "You have to specify correct command name.",
//           "Check the documentation to get full list of commands."
//         ],
//         paramDomain
//       );
//     }
//     return this.buildParam.buildSuccess(paramDomain);
//   }
// }
