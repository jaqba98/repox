// // todo: refactor
// import {
//   RunParamDomainModel
// } from "../../model/run-param-domain.model";
// import {
//   ParamDomainModel,
//   ParamsDomainValidatorModel
// } from "../../model/param-domain.model";
// import { singleton } from "tsyringe";
// import { ProgramEnum } from "../../enum/program.enum";
//
// @singleton()
// export class ProgramExistService implements RunParamDomainModel {
//   run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
//     const programExist = Object.values(ProgramEnum)
//       .map(item => item.toString())
//       .includes(paramsDomain.program.name);
//     return programExist ?
//       { isError: false, wrongIndexes: [], errors: [], tips: [] } :
//       {
//         isError: true,
//         wrongIndexes: [paramsDomain.program.index],
//         errors: ["You have given not existing program!"],
//         tips: [
//           "Check the documentation and enter an existing program."
//         ]
//       };
//   }
// }
