// import { singleton } from "tsyringe";
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
// todo: refactor this