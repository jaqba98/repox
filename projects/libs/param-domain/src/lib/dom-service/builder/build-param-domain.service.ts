import { singleton } from "tsyringe";
import {
  BuildParamArgDomainService
} from "./build-param-arg-domain.service";
import {
  GetParamDtoArgAppService,
  GetParamDtoDataAppService,
  GetParamDtoIndexAppService,
  GetParamDtoNameAppService
} from "@lib/param-dto";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
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

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly buildParamArgDomain: BuildParamArgDomainService,
    private readonly getParamDtoDataApp: GetParamDtoDataAppService,
    private readonly paramDomainStore: ParamDomainStoreService,
    private readonly getParamDtoNameApp: GetParamDtoNameAppService,
    private readonly getParamDtoIndexApp: GetParamDtoIndexAppService,
    private readonly getParamDtoArgApp: GetParamDtoArgAppService
  ) {
  }

  build(): void {
    const programBaseName = this.getParamDtoNameApp.getProgramName();
    const commandBaseName = this.getParamDtoNameApp.getCommandName();
    const programIndex = this.getParamDtoIndexApp
      .getProgramIndex(programBaseName);
    const commandIndex = this.getParamDtoIndexApp
      .getCommandIndex(commandBaseName);
    const programName = this.getProgramName(programBaseName);
    const commandName = this.getCommandName(commandBaseName);
    const programArgs = this.getParamDtoArgApp
      .getProgramArgs(programIndex, commandIndex);
    const commandArgs = this.getParamDtoArgApp
      .getCommandArgs(commandIndex);
    const programFullArgs = programArgs.map(arg => (
      <ParamDomainArgModel>{
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(arg.paramType, arg.paramName),
        index: arg.paramIndex,
        values: arg.paramValues,
        hasValue: arg.paramHasValue,
        hasManyValues: arg.paramHasManyValues
      }));
    const commandFullArgs = commandArgs.map(arg => (
      <ParamDomainArgModel>{
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(arg.paramType, arg.paramName),
        index: arg.paramIndex,
        values: arg.paramValues,
        hasValue: arg.paramHasValue,
        hasManyValues: arg.paramHasManyValues
      }));
    const paramDomain: ParamDomainModel = {
      program: {
        baseName: programBaseName,
        name: programName,
        index: programIndex,
        args: programFullArgs,
        model: this.buildParamArgDomain.buildProgramModel(
          programName,
          programFullArgs
        )
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: commandFullArgs,
        model: this.buildParamArgDomain.buildCommandModel(
          programName,
          commandName,
          commandFullArgs
        )
      }
    };
    this.paramDomainStore.setParamDomain(paramDomain);
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

  private getArgumentName(
    paramType: string, paramName: string
  ): ArgumentEnum {
    if (paramType === "argument") {
      const argument = Object.keys(ArgumentEnum).find(key =>
        ArgumentEnum[key as keyof typeof ArgumentEnum] === paramName
      );
      return argument ?
        ArgumentEnum[argument as keyof typeof ArgumentEnum] :
        ArgumentEnum.unknown;
    }
    if (paramType === "alias") {
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
