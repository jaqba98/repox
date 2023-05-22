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
//   ParamDependencyArgsModel,
//   ParamDependencyModel
// } from "../../model/param-domain/param-dependency.model";
// import { ProgramEnum } from "../../enum/program.enum";
// import { ArgumentEnum } from "../../enum/argument.enum";
// import {
//   GetParamDependencyService
// } from "../service/get-param-dependency.service";
//
// @singleton()
// /**
//  * The validator is responsible for checking that the given program
//  * arguments are correct.
//  */
// export class ProgramArgumentsCorrectService
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
//     const programDep: ParamDependencyModel = this.getParamDependency
//       .getDependency(programName);
//     const programArgs = programDep.args;
//     const wrongArgs = paramDomain.program.args
//       .filter(arg => arg.name !== ArgumentEnum.unknown)
//       .filter(arg => !this.checkCommandArgs(arg, programArgs));
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
//     programArg: ParamDomainArgumentModel,
//     programArgs: ParamDependencyArgsModel
//   ): boolean {
//     const depArg = programArgs[programArg.name];
//     if (depArg.valueMode === "empty") {
//       return programArg.values.length === 0;
//     }
//     if (depArg.valueMode === "single") {
//       return programArg.values.length === 1;
//     }
//     return programArg.values.length > 1;
//   }
// }
// // todo: refactor