import { singleton } from "tsyringe";
import {
  ParamDtoFinder
} from "../../infra/service/finder/param-dto-finder";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import { Program, ProgramAlias } from "../../enum/program";
import { Command, CommandAlias } from "../../enum/command";
import { ParamType } from "../../infra/enum/param-type";
import { Alias, Argument } from "../../enum/argument";

/**
 * Build the parameter domain model.
 */
@singleton()
export class BuildParamDomain {
  constructor(private readonly paramDtoFinder: ParamDtoFinder) {
  }

  build(paramDto: ParamDtoModel): ParamDomainModel {
    const application = this.paramDtoFinder.findApplication(paramDto);
    const program = this.paramDtoFinder.findProgram(paramDto);
    const command = this.paramDtoFinder.findCommand(paramDto);
    const programBaseName: string = program ? program.paramName : "";
    const commandBaseName: string = command ? command.paramName : "";
    const programName: Program = this.getProgramName(programBaseName);
    const commandName: Command = this.getCommandName(commandBaseName);
    const programIndex = this.getProgramIndex(application, program);
    const commandIndex = this.getCommandIndex(command, paramDto);
    const programArgs = this.paramDtoFinder.findProgramArgs(
      paramDto,
      programIndex,
      commandIndex
    );
    const commandArgs = this.paramDtoFinder.findCommandArgs(
      paramDto,
      commandIndex
    );
    return {
      program: {
        baseName: programBaseName,
        name: programName,
        index: programIndex,
        args: this.buildArguments(programArgs)
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: this.buildArguments(commandArgs)
      }
    };
  }

  private getProgramName(programName: string): Program {
    if (programName === Program.default) return Program.default;
    const programNameAlias = Object.keys(ProgramAlias).find(key =>
      ProgramAlias[key as keyof typeof ProgramAlias] === programName
    );
    if (programNameAlias) {
      return Program[programNameAlias as keyof typeof Program];
    }
    const programNameFull = Object.keys(Program).find(key =>
      Program[key as keyof typeof Program] === programName
    );
    if (programNameFull) {
      return Program[programNameFull as keyof typeof Program];
    }
    return Program.unknown;
  }

  private getCommandName(commandName: string): Command {
    if (commandName === Command.default) return Command.default;
    const commandNameAlias = Object.keys(CommandAlias).find(key =>
      CommandAlias[key as keyof typeof CommandAlias] === commandName
    );
    if (commandNameAlias) {
      return Command[commandNameAlias as keyof typeof Command];
    }
    const commandNameFull = Object.keys(Command).find(key =>
      Command[key as keyof typeof Command] === commandName
    );
    if (commandNameFull) {
      return Command[commandNameFull as keyof typeof Command];
    }
    return Command.unknown;
  }

  private getProgramIndex(
    application: ParamDtoEntityModel,
    program: ParamDtoEntityModel | undefined
  ): number {
    return program ? program.paramIndex : application.paramIndex;
  }

  private getCommandIndex(
    command: ParamDtoEntityModel | undefined,
    paramDto: ParamDtoModel
  ): number {
    return command ? command.paramIndex : paramDto.params.length;
  }

  private buildArguments(
    args: Array<ParamDtoEntityModel>
  ): Array<ParamDomainArgumentModel> {
    return args.map(programArg => ({
      baseName: programArg.paramName,
      name: this.getArgumentName(
        programArg.paramName,
        programArg.paramType
      ),
      values: programArg.paramValues,
      index: programArg.paramIndex,
      hasValue: programArg.paramHasValue,
      hasManyValues: programArg.paramHasManyValues
    }));
  }

  private getArgumentName(arg: string, type: ParamType): Argument {
    if (type === ParamType.argument) {
      const argument = Object.keys(Argument).find(key =>
        Argument[key as keyof typeof Argument] === arg
      );
      return argument ?
        Argument[argument as keyof typeof Argument] :
        Argument.unknown;
    }
    if (type === ParamType.alias) {
      const alias = Object.keys(Alias).find(key =>
        Alias[key as keyof typeof Alias] === arg
      );
      return alias ?
        Argument[alias as keyof typeof Argument] :
        Argument.unknown;
    }
    return Argument.unknown;
  }
}
