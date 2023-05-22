// import { singleton } from "tsyringe";
// import {
//   BuildParamDomainService
// } from "../dom-service/builder/build-param-domain.service";
// import {
//   ParamDomainValidationService
// } from "../dom-service/validation-domain/param-domain-validation.service";
// import { ParamDtoModel } from "../../../param-dto/src/model/param-dto.model";
// import {
//   ParamDomainValidationModel
// } from "../model/param-domain/param-domain-validation.model";
//
// @singleton()
// /**
//  * The app service is responsible for read and validate
//  * parameter domain model from program line.
//  */
// export class ReadParamDomainAppService {
//   constructor(
//     private readonly buildParamDomain: BuildParamDomainService,
//     private readonly paramDomainValidation: ParamDomainValidationService
//   ) {
//   }
//
//   build(paramDto: ParamDtoModel): ParamDomainValidationModel {
//     const paramDomain = this.buildParamDomain.build(paramDto);
//     return this.paramDomainValidation.runValidation(paramDomain);
//   }
// }
// // todo: refactor