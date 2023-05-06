import { singleton } from "tsyringe";
import {
  ProgramAlias,
  Program
} from "../../enum/program";
import {
  CommandAlias,
  Command
} from "../../enum/command";
import {
  CommandDefaultArgsModel,
  EmptyArgsModel,
  ParamDomainArgsModel,
  ParamDomainModel,
  ProgramDefaultArgsModel,
  ProgramGenerateCommandProjectArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";
import { AliasEnum, Argument } from "../../enum/argument";

@singleton()
/**
 * The service is responsible for building
 * the parameter config model.
 */
export class BuildParamDomainService {
  build(paramDto: any): ParamDomainModel {
    const programName: Program = this.getProgramName(paramDto);
    const programIndex: number = this.getProgramIndex(paramDto);
    const commandName: Command = this.getCommandName(paramDto);
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

  private getProgramName(paramDto: any): Program {
    const program: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "program");
    if (!program) {
      return Program.default;
    }
    switch (program.paramName) {
      case "":
        return Program.default;
      case Program.generate:
      case ProgramAlias.generate:
        return Program.generate;
      default:
        return Program.unknown;
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
    programName: Program,
    programArgs: Array<any>
  ): ParamDomainArgsModel {
    const version = this.getArg(
      programArgs, Argument.version, AliasEnum.version
    );
    const clean = this.getArg(
      programArgs, Argument.clean, AliasEnum.clean
    );
    switch (programName) {
      case Program.default:
        return <ProgramDefaultArgsModel>{
          version: {
            name: Argument.version,
            index: version?.paramIndex,
            values: version?.paramValues,
            hasValue: version?.paramHasValue,
            hasManyValues: version?.paramHasManyValues,
            isDefined: Boolean(version?.paramIndex)
          },
          clean: {
            name: Argument.clean,
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

  private getCommandName(paramDto: any): Command {
    const command: any | undefined = paramDto.params
      .find((paramDto: any) => paramDto.paramType === "command");
    if (!command) {
      return Command.default;
    }
    switch (command.paramName) {
      case "":
        return Command.default;
      case Command.workspace:
      case CommandAlias.workspace:
        return Command.workspace;
      case Command.project:
      case CommandAlias.project:
        return Command.project;
      default:
        return Command.unknown;
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
    commandName: Command,
    programArgs: Array<any>
  ): ParamDomainArgsModel {
    const name = this.getArg(
      programArgs, Argument.name, AliasEnum.name
    );
    const type = this.getArg(
      programArgs, Argument.type, AliasEnum.type
    );
    const config = this.getArg(
      programArgs, Argument.config, AliasEnum.config
    );
    switch (commandName) {
      case Command.default:
        return <CommandDefaultArgsModel>{};
      case Command.workspace:
        return <ProgramGenerateCommandWorkspaceArgsModel>{
          name: {
            name: Argument.name,
            index: name?.paramIndex,
            values: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues,
            isDefined: Boolean(name?.paramIndex)
          },
          config: {
            name: Argument.config,
            index: config?.paramIndex,
            values: config?.paramValues,
            hasValue: config?.paramHasValue,
            hasManyValues: config?.paramHasManyValues,
            isDefined: Boolean(config?.paramIndex)
          }
        };
      case Command.project:
        return <ProgramGenerateCommandProjectArgsModel>{
          name: {
            name: Argument.name,
            index: name?.paramIndex,
            values: name?.paramValues,
            hasValue: name?.paramHasValue,
            hasManyValues: name?.paramHasManyValues,
            isDefined: Boolean(name?.paramIndex)
          },
          type: {
            name: Argument.type,
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
    argument: Argument,
    alias: AliasEnum
  ): any | undefined {
    return args.find(arg =>
      arg.paramName === argument || arg.paramName === alias
    );
  }
}
