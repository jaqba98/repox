// import { container, singleton } from "tsyringe";
// import {
//   GetParamDependenceService
// } from "../service/get-param-dependence.service";
// import {
//   BuildParamDomainValidation
// } from "../builder/build-param-domain-validation";
// import {
//   ParamDomainModel
// } from "../../model/param-domain/param-domain-model";
// import {
//   ParamDomainValidationModel
// } from "../../model/param-domain/param-domain-validation-model";
// import {
//   ValidatorDomainModel
// } from "../../model/validator-domain/validator-domain.model";
// import {
//   ParamDependencyModel
// } from "../../model/param-domain/param-dependency-model";
// import {
//   ProgramExistValidatorService
// } from "./program-exist-validator.service";
// import {
//   CommandExistValidatorService
// } from "./command-exist-validator.service";
// import {
//   ProgramArgsValidatorService
// } from "./program-args-validator.service";
// import {
//   CommandArgsValidatorService
// } from "./command-args-validator.service";
//
// @singleton()
// /**
//  * The service is responsible for verify the parameter config model.
//  */
// export class ParamDomainValidationService {
//   constructor(
//     private readonly getParamDependence: GetParamDependenceService,
//     private readonly buildParam: BuildParamDomainValidation
//   ) {
//   }
//
//   runValidation(
//     paramDomain: ParamDomainModel
//   ): ParamDomainValidationModel {
//     const paramDep: ParamDependencyModel = this.getParamDependence
//       .getParamDependence(paramDomain.program.name);
//     const command = paramDep.commands[paramDomain.command.name];
//     const error = this.getAllValidators()
//       .map(validator => {
//         return validator.runValidator(paramDomain, paramDep, command);
//       })
//       .find(result => result.isError);
//     return error ?
//       error :
//       this.buildParam.buildSuccess(paramDomain);
//   }
//
//   private getAllValidators(): Array<ValidatorDomainModel> {
//     return [
//       ProgramExistValidatorService,
//       CommandExistValidatorService,
//       ProgramArgsValidatorService,
//       CommandArgsValidatorService
//     ].map(validator => {
//       return container.resolve<ValidatorDomainModel>(validator);
//     });
//   }
// }
