import { singleton } from "tsyringe";
import {
  BaseGetParamDependencyModel,
  KeyValueModel
} from "@lib/model";
import {
  GetParamDtoArgAppService,
  GetParamDtoIndexAppService,
  GetParamDtoNameAppService
} from "@lib/param-dto";
import {
  ParamDomainArgModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import { EMPTY_STRING } from "@lib/const";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly getParamDtoName: GetParamDtoNameAppService,
    private readonly getParamDtoIndex: GetParamDtoIndexAppService,
    private readonly getParamDtoArg: GetParamDtoArgAppService,
    private readonly paramDomainStore: ParamDomainStoreService
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
    const programBaseName = this.getParamDtoName.getProgramName();
    const commandBaseName = this.getParamDtoName.getCommandName();
    const programIndex = this.getParamDtoIndex.getProgramIndex(
      programBaseName
    );
    const commandIndex = this.getParamDtoIndex.getCommandIndex(
      commandBaseName
    );
    const programName = this.getProgramCommandName(
      programBaseName, programEnum, programAliasEnum
    );
    const commandName = this.getProgramCommandName(
      commandBaseName, commandEnum, commandAliasEnum
    );
    const programArgs = this.getParamDtoArg.getProgramArgs(
      programIndex, commandIndex
    );
    const commandArgs = this.getParamDtoArg.getCommandArgs(
      commandIndex
    );
    const programDomainArgs = programArgs
      .map<ParamDomainArgModel>(arg => ({
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(
          arg.paramType, arg.paramName, argumentEnum, aliasEnum
        ),
        index: arg.paramIndex,
        values: arg.paramValues,
        hasValue: arg.paramHasValue,
        hasManyValues: arg.paramHasManyValues
      }));
    const commandDomainArgs = commandArgs
      .map<ParamDomainArgModel>(arg => ({
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(
          arg.paramType, arg.paramName, argumentEnum, aliasEnum
        ),
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
        args: programDomainArgs
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: commandDomainArgs
      }
    };
    this.paramDomainStore.setParamDomain(paramDomain);
  }

  private getProgramCommandName(
    baseName: string,
    enums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    // Verification the enums and alias enums
    if (!enums.some(enumItem => enumItem.key === "default")) {
      throw new Error("Not defined default key in the enum");
    }
    if (!enums.some(enumItem => enumItem.key === "unknown")) {
      throw new Error("Not defined unknown key in the enum");
    }
    // Return empty string then baseName is empty string
    if (baseName === EMPTY_STRING) {
      const defaultEnum = enums.find(enumItem =>
        enumItem.key === "default" &&
        enumItem.value === EMPTY_STRING
      );
      if (!defaultEnum) {
        throw new Error("Not defined default key in the enum");
      }
      return defaultEnum.key;
    }
    // Find name by alias enums
    const alias = aliasEnums.find(alias => alias.value === baseName);
    if (alias) {
      const mainEnum = enums.find(
        enumItem => enumItem.key === alias.key
      );
      if (!mainEnum) {
        throw new Error("Not defined main enum for given alias enum");
      }
      return mainEnum.key;
    }
    // Find name by enums
    const main = enums.find(enumItem => enumItem.value === baseName);
    if (main) {
      return main.key;
    }
    return "unknown";
  }

  private getArgumentName(
    paramType: string,
    paramName: string,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>
  ): string {
    // Verification the argument enum and alias enum
    if (!argumentEnum.some(enumItem => enumItem.key === "unknown")) {
      throw new Error("Not defined unknown key in the enum");
    }
    // Find by argument name
    if (paramType === "argument") {
      const argument = argumentEnum.find(argumentItem => {
        return argumentItem.value === paramName
      });
      return argument ? argument.key : "unknown";
    }
    // Find by alias name
    if (paramType === "alias") {
      const alias = aliasEnum.find(aliasKey => {
        return aliasKey.value === paramName
      });
      return alias ? alias.key : "unknown";
    }
    return "unknown";
  }
}
