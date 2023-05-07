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
//  * the given program arguments are correct.
//  */
// export class ProgramArgsValidatorService
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
//     const programArgs = paramDep.args;
//     const domainArgs = Object.values(paramDomain.program.args)
//       .map(domainArg => <BaseFieldModel>domainArg);
//     const missingProgramArgs = Object.values(programArgs)
//       .filter(arg => arg.required)
//       .filter(arg => domainArgs.find(domainArg =>
//         domainArg.name === arg.name && domainArg.index === undefined)
//       )
//       .map(arg => arg.name);
//     if (missingProgramArgs.length > 0) {
//       return this.buildParam.buildError(
//         [],
//         ["You have not specified required arguments for program!"],
//         [
//           "You have to specify all required arguments.",
//           `Missing arguments: ${missingProgramArgs.join(",")}`
//         ],
//         paramDomain
//       );
//     }
//     return this.buildParam.buildSuccess(paramDomain);
//   }
// }
