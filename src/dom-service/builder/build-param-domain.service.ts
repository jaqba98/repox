import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto.model";
import {
  ParamDomainArgModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import { ParamTypeEnum } from "../../infra/enum/param-type.enum";
import {
  ProgramAliasEnum,
  ProgramEnum
} from "../../enum/program.enum";
import {
  CommandAliasEnum,
  CommandEnum
} from "../../enum/command.enum";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for building
 * the parameter domain model.
 */
export class BuildParamDomainService {
  build(paramDto: ParamDtoModel): ParamDomainModel {
    const application = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.application);
    if (!application) {
      throw new Error("Application cannot be undefined!");
    }
    const program = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
    const command = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.command);
    const programIndex = program ?
      program.paramIndex :
      application.paramIndex;
    const commandIndex = command ?
      command.paramIndex :
      paramDto.params.length;
    const programName = this.getProgramName(program);
    const commandName = this.getCommandName(command);
    const programArgs = this.getProgramArgs(
      programIndex,
      commandIndex,
      paramDto
    );
    const commandArgs = this.getCommandArgs(commandIndex, paramDto);
    return {
      program: {
        name: this.parseProgramName(programName),
        index: programIndex,
        args: programArgs
      },
      command: {
        name: this.parseCommandName(commandName),
        index: commandIndex,
        args: commandArgs
      }
    };
  }

  private getProgramName(
    program: ParamDtoEntityModel | undefined
  ): string {
    return program ?
      program.paramName :
      ProgramEnum.default;
  }

  private getCommandName(
    command: ParamDtoEntityModel | undefined
  ): string {
    return command ?
      command.paramName :
      CommandEnum.default;
  }

  private getProgramArgs(
    programIndex: number,
    commandIndex: number,
    paramDto: ParamDtoModel
  ): Array<ParamDomainArgModel> {
    return paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param =>
        param.paramIndex > programIndex &&
        param.paramIndex < commandIndex
      )
      .map(param => this.buildArg(param));
  }

  private getCommandArgs(
    commandIndex: number,
    paramDto: ParamDtoModel
  ): Array<ParamDomainArgModel> {
    return paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param => param.paramIndex > commandIndex)
      .map(param => this.buildArg(param));
  }

  private isArgument(param: ParamDtoEntityModel): boolean {
    return [
      ParamTypeEnum.argument,
      ParamTypeEnum.alias
    ].includes(param.paramType);
  }

  private buildArg(param: ParamDtoEntityModel): ParamDomainArgModel {
    return {
      name: this.parseArgName(param.paramName),
      values: param.paramValues,
      index: param.paramIndex,
      isAlias: param.paramType === ParamTypeEnum.alias
    }
  }

  private parseArgName(argName: string): ArgumentEnum {
    switch (argName) {
      case ArgumentEnum.name:
      case AliasEnum.name:
        return ArgumentEnum.name;
      case ArgumentEnum.version:
      case AliasEnum.version:
        return ArgumentEnum.version;
      case ArgumentEnum.type:
      case AliasEnum.type:
        return ArgumentEnum.type;
      default:
        return ArgumentEnum.unknown;
    }
  }

  private parseProgramName(programName: string): ProgramEnum {
    switch (programName) {
      case "":
        return ProgramEnum.default;
      case ProgramEnum.generate:
      case ProgramAliasEnum.generate:
        return ProgramEnum.generate;
      default:
        return ProgramEnum.unknown;
    }
  }

  private parseCommandName(commandName: string): CommandEnum {
    switch (commandName) {
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
}
