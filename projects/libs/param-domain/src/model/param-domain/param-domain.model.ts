// import { ArgumentEnum } from "../../enum/argument.enum";
// import { ProgramEnum } from "../../enum/program.enum";
// import { CommandEnum } from "../../enum/command.enum";
//
// /**
//  * Domain parameter model for all parameters built from dto.
//  */
//
// export interface ParamDomainArgumentModel {
//   baseName: string;
//   name: ArgumentEnum;
//   values: Array<string>;
//   index: number;
//   hasValue: boolean;
//   hasManyValues: boolean;
// }
//
// export interface ParamDomainEntityModel<TName> {
//   baseName: string;
//   name: TName;
//   index: number;
//   args: Array<ParamDomainArgumentModel>;
// }
//
// export interface ParamDomainModel {
//   program: ParamDomainEntityModel<ProgramEnum>;
//   command: ParamDomainEntityModel<CommandEnum>;
// }
// // todo: refactor