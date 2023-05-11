import { singleton } from "tsyringe";
import {
  ParamDtoFinder
} from "../../infra/service/finder/param-dto-finder";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../parameter/src/model/param-dto/param-dto.model";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import { ProgramEnum, ProgramAlias } from "../../parameter/src/enum/program.enum";
import { CommandEnum, CommandAlias } from "../../parameter/src/enum/command.enum";
import { ParamTypeEnum } from "../../parameter/src/enum/param-type.enum";
import { Alias, ArgumentEnum } from "../../parameter/src/enum/argument.enum";

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
    const programName: ProgramEnum = this.getProgramName(programBaseName);
    const commandName: CommandEnum = this.getCommandName(commandBaseName);
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

  private getProgramName(programName: string): ProgramEnum {
    if (programName === ProgramEnum.default) return ProgramEnum.default;
    const programNameAlias = Object.keys(ProgramAlias).find(key =>
      ProgramAlias[key as keyof typeof ProgramAlias] === programName
    );
    if (programNameAlias) {
      return ProgramEnum[programNameAlias as keyof typeof ProgramEnum];
    }
    const programNameFull = Object.keys(ProgramEnum).find(key =>
      ProgramEnum[key as keyof typeof ProgramEnum] === programName
    );
    if (programNameFull) {
      return ProgramEnum[programNameFull as keyof typeof ProgramEnum];
    }
    return ProgramEnum.unknown;
  }

  private getCommandName(commandName: string): CommandEnum {
    if (commandName === CommandEnum.default) return CommandEnum.default;
    const commandNameAlias = Object.keys(CommandAlias).find(key =>
      CommandAlias[key as keyof typeof CommandAlias] === commandName
    );
    if (commandNameAlias) {
      return CommandEnum[commandNameAlias as keyof typeof CommandEnum];
    }
    const commandNameFull = Object.keys(CommandEnum).find(key =>
      CommandEnum[key as keyof typeof CommandEnum] === commandName
    );
    if (commandNameFull) {
      return CommandEnum[commandNameFull as keyof typeof CommandEnum];
    }
    return CommandEnum.unknown;
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

  private getArgumentName(arg: string, type: ParamTypeEnum): ArgumentEnum {
    if (type === ParamTypeEnum.argument) {
      const argument = Object.keys(ArgumentEnum).find(key =>
        ArgumentEnum[key as keyof typeof ArgumentEnum] === arg
      );
      return argument ?
        ArgumentEnum[argument as keyof typeof ArgumentEnum] :
        ArgumentEnum.unknown;
    }
    if (type === ParamTypeEnum.alias) {
      const alias = Object.keys(Alias).find(key =>
        Alias[key as keyof typeof Alias] === arg
      );
      return alias ?
        ArgumentEnum[alias as keyof typeof ArgumentEnum] :
        ArgumentEnum.unknown;
    }
    return ArgumentEnum.unknown;
  }
}
