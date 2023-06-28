import { singleton } from "tsyringe";
import {
  GetParamDtoIndexAppService,
  GetParamDtoNameAppService
} from "@lib/param-dto";
import { EMPTY_STRING } from "@lib/const";
import { KeyValueModel } from "@lib/model";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly getParamDtoNameApp: GetParamDtoNameAppService,
    private readonly getParamDtoIndexApp: GetParamDtoIndexAppService
    // private readonly buildParamArgDomain: BuildParamArgDomainService,
    // private readonly getParamDtoDataApp: GetParamDtoDataAppService,
    // private readonly paramDomainStore: ParamDomainStoreService,
    // private readonly getParamDtoArgApp: GetParamDtoArgAppService
  ) {
  }

  build(
    programEnum: Array<KeyValueModel>,
    programAliasEnum: Array<KeyValueModel>,
    commandEnum: Array<KeyValueModel>,
    commandAliasEnum: Array<KeyValueModel>,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>
  ): void {
    const programBaseName = this.getParamDtoNameApp.getProgramName();
    const commandBaseName = this.getParamDtoNameApp.getCommandName();
    const programIndex = this.getParamDtoIndexApp.getProgramIndex(
      programBaseName
    );
    const commandIndex = this.getParamDtoIndexApp.getCommandIndex(
      commandBaseName
    );
    const programName = this.getProgramCommandName(
      programBaseName, programEnum, programAliasEnum
    );
    const commandName = this.getProgramCommandName(
      commandBaseName, commandEnum, commandAliasEnum
    );
    console.log(programIndex, commandIndex, programName, commandName);

    // const programArgs = this.getParamDtoArgApp
    //   .getProgramArgs(programIndex, commandIndex);
    // const commandArgs = this.getParamDtoArgApp
    //   .getCommandArgs(commandIndex);
    // const programFullArgs = programArgs.map(arg => (
    //   <ParamDomainArgModel>{
    //     baseName: arg.paramBaseValue,
    //     name: this.getArgumentName(arg.paramType, arg.paramName),
    //     index: arg.paramIndex,
    //     values: arg.paramValues,
    //     hasValue: arg.paramHasValue,
    //     hasManyValues: arg.paramHasManyValues
    //   }));
    // const commandFullArgs = commandArgs.map(arg => (
    //   <ParamDomainArgModel>{
    //     baseName: arg.paramBaseValue,
    //     name: this.getArgumentName(arg.paramType, arg.paramName),
    //     index: arg.paramIndex,
    //     values: arg.paramValues,
    //     hasValue: arg.paramHasValue,
    //     hasManyValues: arg.paramHasManyValues
    //   }));
    // const paramDomain: ParamDomainModel = {
    //   program: {
    //     baseName: programBaseName,
    //     name: programName,
    //     index: programIndex,
    //     args: programFullArgs,
    //     model: this.buildParamArgDomain.buildProgramModel(
    //       programName,
    //       programFullArgs
    //     )
    //   },
    //   command: {
    //     baseName: commandBaseName,
    //     name: commandName,
    //     index: commandIndex,
    //     args: commandFullArgs,
    //     model: this.buildParamArgDomain.buildCommandModel(
    //       programName,
    //       commandName,
    //       commandFullArgs
    //     )
    //   }
    // };
    // this.paramDomainStore.setParamDomain(paramDomain);
  }

  private getProgramCommandName(
    baseName: string,
    fullEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    if (!fullEnums.some(fullEnum => fullEnum.key === "default")) {
      throw new Error("Not defined default key in enum!");
    }
    if (!fullEnums.some(fullEnum => fullEnum.key === "unknown")) {
      throw new Error("Not defined unknown key in enum!");
    }
    if (baseName === EMPTY_STRING) {
      const defaultEnum = fullEnums.find(
        fullEnum => fullEnum.value === EMPTY_STRING
      );
      if (!defaultEnum) {
        throw new Error("Not defined default key in enum!");
      }
      return defaultEnum.key;
    }
    const aliasEnum = aliasEnums.find(aliasItem => {
      return aliasItem.value === baseName
    });
    if (aliasEnum) {
      const fullEnum = fullEnums.find(fullItem => {
        return fullItem.key === aliasEnum.key
      });
      if (!fullEnum) {
        throw new Error("For given enum alias not found full enum!");
      }
      return fullEnum.key;
    }

    const fullEnum = fullEnums.find(fullItem => {
      return fullItem.value === baseName
    });
    if (fullEnum) {
      return fullEnum.key;
    }
    return "unknown";
  }

  // private getCommandName<TC>(commandName: string): TC {
  //   if (commandName === CommandEnum.default) {
  //     return CommandEnum.default;
  //   }
  //   const commandAlias = Object.keys(CommandAliasEnum).find(key => {
  //     const commandAliasKey = key as keyof typeof CommandAliasEnum;
  //     return CommandAliasEnum[commandAliasKey] === commandName
  //   });
  //   if (commandAlias) {
  //     return CommandEnum[commandAlias as keyof typeof CommandEnum];
  //   }
  //   const commandNameFull = Object.keys(CommandEnum).find(key =>
  //     CommandEnum[key as keyof typeof CommandEnum] === commandName
  //   );
  //   if (commandNameFull) {
  //     return CommandEnum[commandNameFull as keyof typeof CommandEnum];
  //   }
  //   return CommandEnum.unknown;
  // }
  //
  // private getArgumentName(
  //   paramType: string, paramName: string
  // ): ArgumentEnum {
  //   if (paramType === "argument") {
  //     const argument = Object.keys(ArgumentEnum).find(key =>
  //       ArgumentEnum[key as keyof typeof ArgumentEnum] === paramName
  //     );
  //     return argument ?
  //       ArgumentEnum[argument as keyof typeof ArgumentEnum] :
  //       ArgumentEnum.unknown;
  //   }
  //   if (paramType === "alias") {
  //     const alias = Object.keys(AliasEnum).find(key =>
  //       AliasEnum[key as keyof typeof AliasEnum] === paramName
  //     );
  //     return alias ?
  //       ArgumentEnum[alias as keyof typeof ArgumentEnum] :
  //       ArgumentEnum.unknown;
  //   }
  //   return ArgumentEnum.unknown;
  // }
}

// todo: refactor
