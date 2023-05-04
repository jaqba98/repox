import { singleton } from "tsyringe";
import {
  ProgramAliasEnum,
  ProgramEnum
} from "../../enum/program.enum";
import {
  CommandAliasEnum,
  CommandEnum
} from "../../enum/command.enum";
import {
  CommandDefaultArgsModel,
  EmptyArgsModel,
  ParamDomainArgsModel,
  ParamDomainModel,
  ProgramDefaultArgsModel,
  ProgramGenerateCommandProjectArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for building
 * the parameter config model.
 */
export class BuildParamDomainService {
  build(paramDto: any): ParamDomainModel {
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

  private getProgramName(paramDto: any): ProgramEnum {
    const program: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "program");
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

  private getProgramIndex(paramDto: any): number {
    const application = paramDto.params
      .find((param: any) => param.paramType === "application");
    if (!application) {
      throw new Error("Application cannot be undefined!");
    }
    const program: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "program");
    return program ? program.paramIndex : application.paramIndex;
  }

  private getProgramArgs(
    programIndex: number,
    commandIndex: number,
    paramDto: any
  ): Array<any> {
    return paramDto.params
      .filter((param: any) => this.isArgument(param))
      .filter((param: any) =>
        param.paramIndex > programIndex &&
        param.paramIndex < commandIndex
      )
  }

  private buildProgramArgs(
    programName: ProgramEnum,
    programArgs: Array<any>
  ): ParamDomainArgsModel {
    const version = this.getArg(
      programArgs, ArgumentEnum.version, AliasEnum.version
    );
    const clean = this.getArg(
      programArgs, ArgumentEnum.clean, AliasEnum.clean
    );
    switch (programName) {
      case ProgramEnum.default:
        return <ProgramDefaultArgsModel>{
          version: {
            name: ArgumentEnum.version,
            index: version?.paramIndex,
            values: version?.paramValues,
            hasValue: version?.paramHasValue,
            hasManyValues: version?.paramHasManyValues,
            isDefined: Boolean(version?.paramIndex)
          },
          clean: {
            name: ArgumentEnum.clean,
            index: clean?.paramIndex,
            values: clean?.paramValues,
            hasValue: clean?.paramHasValue,
            hasManyValues: clean?.paramHasManyValues,
            isDefined: Boolean(clean?.paramIndex)
          }
        };
      default:
        return <EmptyArgsModel>{};
    }
  }

  private getCommandName(paramDto: any): CommandEnum {
    const command: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "command");
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

  private getCommandIndex(paramDto: any): number {
    const command: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "command");
    return command ? command.paramIndex : paramDto.params.length;
  }

  private getCommandArgs(
    commandIndex: number,
    paramDto: any
  ): Array<any> {
    return paramDto.params
      .filter((param: any) => this.isArgument(param))
      .filter((param: any) => param.paramIndex > commandIndex)
  }

  private buildCommandArgs(
    commandName: CommandEnum,
    programArgs: Array<any>
  ): ParamDomainArgsModel {
    const name = this.getArg(
      programArgs, ArgumentEnum.name, AliasEnum.name
    );
    const type = this.getArg(
      programArgs, ArgumentEnum.type, AliasEnum.type
    );
    const config = this.getArg(
      programArgs, ArgumentEnum.config, AliasEnum.config
    );
    switch (commandName) {
      case CommandEnum.default:
        return <CommandDefaultArgsModel>{};
      case CommandEnum.workspace:
        return <ProgramGenerateCommandWorkspaceArgsModel>{
          name: {
            name: ArgumentEnum.name,
            index: name?.paramIndex,
            values: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues,
            isDefined: Boolean(name?.paramIndex)
          },
          config: {
            name: ArgumentEnum.config,
            index: config?.paramIndex,
            values: config?.paramValues,
            hasValue: config?.paramHasValue,
            hasManyValues: config?.paramHasManyValues,
            isDefined: Boolean(config?.paramIndex)
          }
        };
      case CommandEnum.project:
        return <ProgramGenerateCommandProjectArgsModel>{
          name: {
            name: ArgumentEnum.name,
            index: name?.paramIndex,
            values: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues,
            isDefined: Boolean(name?.paramIndex)
          },
          type: {
            name: ArgumentEnum.type,
            index: type?.paramIndex,
            values: type?.paramValues,
            hasValue: type?.paramHasValue,
            hasManyValues: type?.paramHasManyValues,
            isDefined: Boolean(type?.paramIndex)
          }
        };
      default:
        return <EmptyArgsModel>{};
    }
  }

  private isArgument(paramDto: any): boolean {
    return [
      "argument",
      "alias"
    ].includes(paramDto.paramType);
  }

  private getArg(
    args: Array<any>,
    argument: ArgumentEnum,
    alias: AliasEnum
  ): any | undefined {
    return args.find(arg =>
      arg.paramName === argument || arg.paramName === alias
    );
  }
}
