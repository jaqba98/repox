import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto.model";
import {
  ProgramAliasEnum,
  ProgramEnum
} from "../../enum/program.enum";
import {
  CommandAliasEnum,
  CommandEnum
} from "../../enum/command.enum";
import { ParamTypeEnum } from "../../infra/enum/param-type.enum";
import {
  CommandDefaultArgsModel,
  CommandGenerateProjectArgsModel,
  CommandGenerateWorkspaceArgsModel,
  ParamDomainArgsModel,
  ParamDomainModel,
  ProgramDefaultArgsModel,
  UnknownArgsModel
} from "../../model/param-domain/param-domain.model";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for building
 * the parameter domain model.
 */
export class BuildParamDomainService {
  build(paramDto: ParamDtoModel): ParamDomainModel {
    const programName: ProgramEnum = this.getProgramName(paramDto);
    const programIndex: number = this.getProgramIndex(paramDto);
    const commandName: CommandEnum = this.getCommandName(paramDto);
    const commandIndex: number = this.getCommandIndex(paramDto);
    const programArgs = this.getProgramArgs(
      programIndex,
      commandIndex,
      paramDto
    );
    const commandArgs = this.getCommandArgs(commandIndex, paramDto);
    const buildProgramArgs = this.buildProgramArgs(
      programName,
      programArgs
    );
    const buildCommandArgs = this.buildCommandArgs(
      commandName,
      commandArgs
    );
    return {
      program: {
        name: programName,
        index: programIndex,
        args: buildProgramArgs
      },
      command: {
        name: commandName,
        index: commandIndex,
        args: buildCommandArgs
      }
    };
  }

  private getProgramName(paramDto: ParamDtoModel): ProgramEnum {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(paramDto => paramDto.paramType === ParamTypeEnum.program);
    if (!program) {
      return ProgramEnum.default;
    }
    switch (program.paramName) {
      case "":
        return ProgramEnum.default;
      case ProgramEnum.generate:
      case ProgramAliasEnum.generate:
        return ProgramEnum.generate;
      default:
        return ProgramEnum.unknown;
    }
  }

  private getProgramIndex(paramDto: ParamDtoModel): number {
    const application = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.application);
    if (!application) {
      throw new Error("Application cannot be undefined!");
    }
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(paramDto => paramDto.paramType === ParamTypeEnum.program);
    return program ? program.paramIndex : application.paramIndex;
  }

  private getProgramArgs(
    programIndex: number,
    commandIndex: number,
    paramDto: ParamDtoModel
  ): Array<ParamDtoEntityModel> {
    return paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param =>
        param.paramIndex > programIndex &&
        param.paramIndex < commandIndex
      )
  }

  private buildProgramArgs(
    programName: ProgramEnum,
    programArgs: Array<ParamDtoEntityModel>
  ): ParamDomainArgsModel {
    const version = this.getArg(programArgs, ArgumentEnum.version, AliasEnum.version);
    switch (programName) {
      case ProgramEnum.default:
        return <ProgramDefaultArgsModel>{
          version: {
            name: ArgumentEnum.version,
            index: version?.paramIndex,
            value: version?.paramValues,
            hasValue: version?.paramHasValue,
            hasManyValues: version?.paramHasManyValues
          }
        };
      default:
        return <UnknownArgsModel>{};
    }
  }

  private getCommandName(paramDto: ParamDtoModel): CommandEnum {
    const command: ParamDtoEntityModel | undefined = paramDto.params
      .find(paramDto => paramDto.paramType === ParamTypeEnum.command);
    if (!command) {
      return CommandEnum.default;
    }
    switch (command.paramName) {
      case "":
        return CommandEnum.default;
      case CommandEnum.workspace:
      case CommandAliasEnum.workspace:
        return CommandEnum.workspace;
      case CommandEnum.project:
      case CommandAliasEnum.project:
        return CommandEnum.project;
      default:
        return CommandEnum.unknown;
    }
  }

  private getCommandIndex(paramDto: ParamDtoModel): number {
    const command: ParamDtoEntityModel | undefined = paramDto.params
      .find(paramDto => paramDto.paramType === ParamTypeEnum.command);
    return command ? command.paramIndex : paramDto.params.length;
  }

  private getCommandArgs(
    commandIndex: number,
    paramDto: ParamDtoModel
  ): Array<ParamDtoEntityModel> {
    return paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param => param.paramIndex > commandIndex)
  }

  private buildCommandArgs(
    commandName: CommandEnum,
    programArgs: Array<ParamDtoEntityModel>
  ): ParamDomainArgsModel {
    const name = this.getArg(programArgs, ArgumentEnum.name, AliasEnum.name);
    const type = this.getArg(programArgs, ArgumentEnum.name, AliasEnum.name);
    switch (commandName) {
      case CommandEnum.default:
        return <CommandDefaultArgsModel>{};
      case CommandEnum.workspace:
        return <CommandGenerateWorkspaceArgsModel>{
          name: {
            name: ArgumentEnum.name,
            index: name?.paramIndex,
            value: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues
          }
        };
      case CommandEnum.project:
        return <CommandGenerateProjectArgsModel>{
          name: {
            name: ArgumentEnum.name,
            index: name?.paramIndex,
            value: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues
          },
          type: {
            name: ArgumentEnum.type,
            index: type?.paramIndex,
            value: type?.paramValues,
            hasValue: type?.paramHasValue,
            hasManyValues: type?.paramHasManyValues
          }
        };
      default:
        return <UnknownArgsModel>{};
    }
  }

  private isArgument(paramDto: ParamDtoEntityModel): boolean {
    return [
      ParamTypeEnum.argument,
      ParamTypeEnum.alias
    ].includes(paramDto.paramType);
  }

  private getArg(
    args: Array<ParamDtoEntityModel>,
    argument: ArgumentEnum,
    alias: AliasEnum
  ): ParamDtoEntityModel | undefined {
    return args.find(arg =>
      arg.paramName === argument || arg.paramName === alias
    );
  }
}
