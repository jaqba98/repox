// import { singleton } from "tsyringe";
// import {
//   ParamDtoEntityModel,
//   ParamDtoModel
// } from "../../../../param-dto/src/model/param-dto.model";
// import {
//   ParamDomainArgModel,
//   ParamDomainModel
// } from "../../model/param-domain/param-domain.model";
// import { ProgramAliasEnum, ProgramEnum } from "../../enum/program.enum";
// import { CommandAliasEnum, CommandEnum } from "../../enum/command.enum";
// import { ParamTypeEnum } from "../../../../param-dto/src/enum/param-type.enum";
// import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";
// import {
//   ParamDtoFinderService
// } from "../../../../param-dto/src/dom-service/finder/param-dto-finder.service";
//
// @singleton()
// /**
//  * Build the parameter domain model.
//  */
// export class BuildParamDomainService {
//   constructor(
//     private readonly paramDtoFinder: ParamDtoFinderService
//   ) {
//   }
//
//   build(paramDto: ParamDtoModel): ParamDomainModel<any, any> {
//     const application = this.paramDtoFinder.findApplication(paramDto);
//     const program = this.paramDtoFinder.findProgram(paramDto)[0];
//     const command = this.paramDtoFinder.findCommand(paramDto)[0];
//     const programBaseName: string = program ? program.paramName : "";
//     const commandBaseName: string = command ? command.paramName : "";
//     const programName = this.getProgramName(programBaseName);
//     const commandName = this.getCommandName(commandBaseName);
//     const programIndex = this.getProgramIndex(application, program);
//     const commandIndex = this.getCommandIndex(command, paramDto);
//     const programArgs = this.paramDtoFinder.findProgramArgs(
//       paramDto,
//       programIndex,
//       commandIndex
//     );
//     const commandArgs = this.paramDtoFinder.findCommandArgs(
//       paramDto,
//       commandIndex
//     );
//     return {
//       program: {
//         baseName: programBaseName,
//         name: programName,
//         index: programIndex,
//         args: this.buildArguments(programArgs),
//         model: {}
//       },
//       command: {
//         baseName: commandBaseName,
//         name: commandName,
//         index: commandIndex,
//         args: this.buildArguments(commandArgs),
//         model: {}
//       }
//     };
//   }
//
//   private getProgramName(programName: string): ProgramEnum {
//     if (programName === ProgramEnum.default) {
//       return ProgramEnum.default;
//     }
//     const programNameAlias = Object.keys(ProgramAliasEnum).find(key =>
//       ProgramAliasEnum[key as keyof typeof ProgramAliasEnum] === programName
//     );
//     if (programNameAlias) {
//       return ProgramEnum[programNameAlias as keyof typeof ProgramEnum];
//     }
//     const programNameFull = Object.keys(ProgramEnum).find(key =>
//       ProgramEnum[key as keyof typeof ProgramEnum] === programName
//     );
//     if (programNameFull) {
//       return ProgramEnum[programNameFull as keyof typeof ProgramEnum];
//     }
//     return ProgramEnum.unknown;
//   }
//
//   private getCommandName(commandName: string): CommandEnum {
//     if (commandName === CommandEnum.default) {
//       return CommandEnum.default;
//     }
//     const commandNameAlias = Object.keys(CommandAliasEnum).find(key =>
//       CommandAliasEnum[key as keyof typeof CommandAliasEnum] === commandName
//     );
//     if (commandNameAlias) {
//       return CommandEnum[commandNameAlias as keyof typeof CommandEnum];
//     }
//     const commandNameFull = Object.keys(CommandEnum).find(key =>
//       CommandEnum[key as keyof typeof CommandEnum] === commandName
//     );
//     if (commandNameFull) {
//       return CommandEnum[commandNameFull as keyof typeof CommandEnum];
//     }
//     return CommandEnum.unknown;
//   }
//
//   private getProgramIndex(
//     application: ParamDtoEntityModel,
//     program: ParamDtoEntityModel | undefined
//   ): number {
//     return program ? program.paramIndex : application.paramIndex;
//   }
//
//   private getCommandIndex(
//     command: ParamDtoEntityModel | undefined,
//     paramDto: ParamDtoModel
//   ): number {
//     return command ? command.paramIndex : paramDto.params.length;
//   }
//
//   private buildArguments(
//     args: Array<ParamDtoEntityModel>
//   ): Array<ParamDomainArgModel> {
//     return args.map(programArg => ({
//       baseName: programArg.paramName,
//       name: this.getArgumentName(
//         programArg.paramName,
//         programArg.paramType
//       ),
//       index: programArg.paramIndex
//     }));
//   }
//
//   private getArgumentName(
//     arg: string,
//     type: ParamTypeEnum
//   ): ArgumentEnum {
//     if (type === ParamTypeEnum.argument) {
//       const argument = Object.keys(ArgumentEnum).find(key =>
//         ArgumentEnum[key as keyof typeof ArgumentEnum] === arg
//       );
//       return argument ?
//         ArgumentEnum[argument as keyof typeof ArgumentEnum] :
//         ArgumentEnum.unknown;
//     }
//     if (type === ParamTypeEnum.alias) {
//       const alias = Object.keys(AliasEnum).find(key =>
//         AliasEnum[key as keyof typeof AliasEnum] === arg
//       );
//       return alias ?
//         ArgumentEnum[alias as keyof typeof ArgumentEnum] :
//         ArgumentEnum.unknown;
//     }
//     return ArgumentEnum.unknown;
//   }
// }
// // todo: refactor