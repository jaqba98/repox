// import { singleton } from "tsyringe";
// import {
//   ValidatorDomainModel
// } from "../../model/validator-domain/validator-domain.model";
// import {
//   GetParamDependenceService
// } from "../service/get-param-dependence.service";
// import {
//   BuildParamDomainValidationService
// } from "../builder/build-param-domain-validation.service";
// import {
//   ParamDomainModel
// } from "../../model/param-domain/param-domain.model";
// import {
//   ParamDependencyCommandModel,
//   ParamDependencyModel
// } from "../../model/param-domain/param-dependency.model";
// import {
//   ParamDomainValidationModel
// } from "../../model/param-domain/param-domain-validation.model";
//
// @singleton()
// /**
//  * The validator is responsible for checking that
//  * the given program arguments are correct.
//  */
// export class ProgramArgsValidatorService
//   implements ValidatorDomainModel {
//   constructor(
//     private readonly getParamDependence: GetParamDependenceService,
//     private readonly buildParam: BuildParamDomainValidationService
//   ) {
//   }
//
//   runValidator(
//     paramDomain: ParamDomainModel,
//     paramDep: ParamDependencyModel,
//     command: ParamDependencyCommandModel
//   ): ParamDomainValidationModel {
//     const programArgs = paramDep.args;
//     const missingProgramArgs = Object.values(programArgs)
//       .filter(arg => arg.required)
//       .filter(arg => !paramDomain.program.args.find(
//         cmdArg => cmdArg.name === arg.argName
//       ))
//       .map(arg => arg.argName);
//     if (missingProgramArgs.length > 0) {
//       return this.buildParam.paramDomainValidationError(
//         [],
//         ["You have not specified required arguments for program!"],
//         [
//           "You have to specify all required arguments.",
//           `Missing arguments: ${missingProgramArgs.join(",")}`
//         ],
//         paramDomain
//       );
//     }
//     const existedProgramArgs = Object.values(programArgs)
//       .map(arg => arg.argName);
//     const notExistedProgramArgs = paramDomain.program.args
//       .filter(arg => !existedProgramArgs.includes(arg.name))
//       .map(arg => arg.index);
//     if (notExistedProgramArgs.length > 0) {
//       return this.buildParam.paramDomainValidationError(
//         notExistedProgramArgs,
//         ["You have specified not existed arguments for program!"],
//         ["You have to specify only existed arguments."],
//         paramDomain
//       );
//     }
//     return this.buildParam.paramDomainValidationSuccess(paramDomain);
//   }
// }
// // todo: fix it