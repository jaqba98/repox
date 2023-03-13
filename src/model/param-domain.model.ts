// // todo: refactor
// /**
//  * Parameters domain model for verified parameters.
//  */
//
// export interface ParamDomainArgModel {
//   name: string;
//   value: Array<string>;
//   index: number;
//   isAlias: boolean;
// }
//
// export interface ParamDomainEntityModel {
//   name: string;
//   index: number;
//   args: Array<ParamDomainArgModel>;
// }
//
// export interface ParamDomainModel {
//   program: ParamDomainEntityModel;
//   command: ParamDomainEntityModel;
// }
//
// /**
//  * The result model of the parameter domain validation.
//  */
// export interface ParamsDomainValidatorModel {
//   isError: boolean;
//   wrongIndexes: Array<number>;
//   errors: Array<string>;
//   tips: Array<string>;
// }
