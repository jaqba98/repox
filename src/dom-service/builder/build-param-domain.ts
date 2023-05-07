import { singleton } from "tsyringe";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import { Program, ProgramAlias } from "../../enum/program";
import { Command, CommandAlias } from "../../enum/command";
import { Alias, Argument } from "../../enum/argument";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";
import {
  ParamDtoFinder
} from "../../infra/service/finder/param-dto-finder";
import { ParamType } from "../../infra/enum/param-type";

/**
 * Build the parameter domain model.
 */
@singleton()
export class BuildParamDomain {
  constructor(private readonly paramDtoFinder: ParamDtoFinder) {
  }

  build(paramDto: ParamDtoModel): ParamDomainModel {
    const program = this.paramDtoFinder.findProgram(paramDto);
    const programBaseName: string = program ? program.paramName : "";
    const command = this.paramDtoFinder.findCommand(paramDto);
    const commandBaseName: string = command ? command.paramName : "";
    const programName: Program = this.getProgramName(paramDto);
    const commandName: Command = this.getCommandName(paramDto);
    const programIndex: number = this.getProgramIndex(paramDto);
    const commandIndex: number = this.getCommandIndex(paramDto);
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

  private getProgramName(paramDto: ParamDtoModel): Program {
    const program = this.paramDtoFinder.findProgram(paramDto);
    const programName: string = program ? program.paramName : "";
    const programAlias = Object.keys(ProgramAlias).find(key =>
      ProgramAlias[key as keyof typeof ProgramAlias] === programName
    );
    if (programAlias) {
      return Program[programName as keyof typeof Program];
    }
    const programFull = Program[programName as keyof typeof Program];
    return programFull ? programFull : Program.unknown;
  }

  private getCommandName(paramDto: ParamDtoModel): Command {
    const command = this.paramDtoFinder.findCommand(paramDto);
    const commandName: string = command ? command.paramName : "";
    const commandAlias = Object.keys(CommandAlias).find(key =>
      CommandAlias[key as keyof typeof CommandAlias] === commandName
    );
    if (commandAlias) {
      return Command[commandAlias as keyof typeof Command];
    }
    const commandFull = Command[commandName as keyof typeof Command];
    return commandFull ? commandFull : Command.unknown;
  }

  private getProgramIndex(paramDto: ParamDtoModel): number {
    const application = this.paramDtoFinder.findApplication(paramDto);
    const program = this.paramDtoFinder.findProgram(paramDto);
    return program ? program.paramIndex : application.paramIndex;
  }

  private getCommandIndex(paramDto: ParamDtoModel): number {
    const command = this.paramDtoFinder.findCommand(paramDto);
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
      const argument = Argument[arg as keyof typeof Argument];
      return argument ? argument : Argument.unknown;
    }
    if (type === ParamType.alias) {
      const alias = Object.keys(Alias).find(key =>
        Alias[key as keyof typeof Alias] === arg
      );
      return alias ?
        Argument[alias as keyof typeof Argument] : Argument.unknown;
    }
    return Argument.unknown;
  }
}
// todo: refactor this