import { singleton } from "tsyringe";
import {
  ParamDomainArgModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ProgramAliasEnum,
  ProgramEnum
} from "../../enum/program.enum";
import {
  CommandAliasEnum,
  CommandEnum
} from "../../enum/command.enum";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";
import { BuildParamModelService } from "./build-param-model.service";
import {
  ParamDtoEntityModel,
  ParamDtoFinderService,
  ParamDtoModel,
  ParamTypeEnum
} from "@lib/param-dto";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly paramDtoFinder: ParamDtoFinderService,
    private readonly buildParamModel: BuildParamModelService
  ) {
  }

  build(model: ParamDtoModel): ParamDomainModel {
    const application = this.paramDtoFinder.findApplication(model);
    const program = this.paramDtoFinder.findProgram(model).at(0);
    const command = this.paramDtoFinder.findCommand(model).at(0);
    const programBaseName = program ? program.paramName : "";
    const commandBaseName = command ? command.paramName : "";
    const programName = this.getProgramName(programBaseName);
    const commandName = this.getCommandName(commandBaseName);
    const programIndex = program ?
      program.paramIndex :
      application.paramIndex;
    const commandIndex = command ?
      command.paramIndex :
      model.params.length;
    const programArgs = this.paramDtoFinder.findProgramArgs(
      model,
      programIndex,
      commandIndex
    );
    const commandArgs = this.paramDtoFinder.findCommandArgs(
      model,
      commandIndex
    );
    const programFullArgs = this.buildArguments(programArgs);
    const commandFullArgs = this.buildArguments(commandArgs);
    return {
      program: {
        baseName: programBaseName,
        name: programName,
        index: programIndex,
        args: programFullArgs,
        model: this.buildParamModel.buildProgramModel(
          programName,
          programFullArgs
        )
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: commandFullArgs,
        model: this.buildParamModel.buildCommandModel(
          programName,
          commandName,
          commandFullArgs
        )
      }
    };
  }

  private getProgramName(programName: string): ProgramEnum {
    if (programName === ProgramEnum.default) {
      return ProgramEnum.default;
    }
    const programAlias = Object.keys(ProgramAliasEnum).find(key => {
      const programAliasKey = key as keyof typeof ProgramAliasEnum;
      return ProgramAliasEnum[programAliasKey] === programName
    });
    if (programAlias) {
      return ProgramEnum[programAlias as keyof typeof ProgramEnum];
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
    if (commandName === CommandEnum.default) {
      return CommandEnum.default;
    }
    const commandAlias = Object.keys(CommandAliasEnum).find(key => {
      const commandAliasKey = key as keyof typeof CommandAliasEnum;
      return CommandAliasEnum[commandAliasKey] === commandName
    });
    if (commandAlias) {
      return CommandEnum[commandAlias as keyof typeof CommandEnum];
    }
    const commandNameFull = Object.keys(CommandEnum).find(key =>
      CommandEnum[key as keyof typeof CommandEnum] === commandName
    );
    if (commandNameFull) {
      return CommandEnum[commandNameFull as keyof typeof CommandEnum];
    }
    return CommandEnum.unknown;
  }

  private buildArguments(
    args: Array<ParamDtoEntityModel>
  ): Array<ParamDomainArgModel> {
    return args.map(arg => (<ParamDomainArgModel>{
      baseName: arg.paramBaseValue,
      name: this.getArgumentName(arg),
      index: arg.paramIndex,
      values: arg.paramValues,
      hasValue: arg.paramHasValue,
      hasManyValues: arg.paramHasManyValues
    }));
  }

  private getArgumentName(arg: ParamDtoEntityModel): ArgumentEnum {
    const { paramType, paramName } = arg;
    if (paramType === ParamTypeEnum.argument) {
      const argument = Object.keys(ArgumentEnum).find(key =>
        ArgumentEnum[key as keyof typeof ArgumentEnum] === paramName
      );
      return argument ?
        ArgumentEnum[argument as keyof typeof ArgumentEnum] :
        ArgumentEnum.unknown;
    }
    if (paramType === ParamTypeEnum.alias) {
      const alias = Object.keys(AliasEnum).find(key =>
        AliasEnum[key as keyof typeof AliasEnum] === paramName
      );
      return alias ?
        ArgumentEnum[alias as keyof typeof ArgumentEnum] :
        ArgumentEnum.unknown;
    }
    return ArgumentEnum.unknown;
  }
}
// todo: refactor