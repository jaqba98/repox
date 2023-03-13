// // todo: refactor
// import { container, singleton } from "tsyringe";
// import {
//   ParamDomainModel,
//   ParamsDomainValidatorModel
// } from "../../model/param-domain.model";
// import {
//   RunParamDomainModel
// } from "../../model/run-param-domain.model";
// import { ProgramExistService } from "./program-exist.service";
// import { CommandExistService } from "./command-exist.service";
// import {
//   CommandSupportedByProgramService
// } from "./command-supported-by-program.service";
// import {
//   ArgsSupportedByProgramService
// } from "./args-supported-by-program.service";
// import {
//   ArgsSupportedByCommandService
// } from "./args-supported-by-command.service";
// import {
//   ProgramRequiredArgsService
// } from "./program-required-args.service";
// import {
//   CommandRequiredArgsService
// } from "./command-required-args.service";
//
// @singleton()
// /**
//  * The service is responsible for run all validators to verify
//  * the parameter domain model.
//  *
//  * Validators:
//  * 1.Verify that program exists.
//  * 2.Verify that command exists.
//  * 3.Verify that command is supported by program.
//  * 4.Verify that arguments are supported by program.
//  * 5.Verify that arguments are supported by command.
//  * 6.Verify that program contains all required args.
//  * 7.Verify that command contains all required args.
//  */
// export class ParamDomainValidatorService {
//   verify(
//     paramDomain: ParamDomainModel
//   ): ParamsDomainValidatorModel | true {
//     const error = this.getAllValidators()
//       .map(validator => validator.run(paramDomain))
//       .find(validator => validator.isError);
//     return error === undefined ? true : error;
//   }
//
//   private getAllValidators(): Array<RunParamDomainModel> {
//     return [
//       ProgramExistService,
//       CommandExistService,
//       CommandSupportedByProgramService,
//       ArgsSupportedByProgramService,
//       ArgsSupportedByCommandService,
//       ProgramRequiredArgsService,
//       CommandRequiredArgsService
//     ].map(validator => container.resolve(validator));
//   }
// }
