import { singleton } from "tsyringe";
import { KeyValueModel } from "@lib/model";
import { EMPTY_STRING } from "@lib/const";
import { BaseParamTypeEnum } from "../../enum/base-param-type.enum";
import { ParamTypeEnum } from "@lib/param-dto";

@singleton()
/**
 * The builder service is responsible for build name of
 * program, command and argument.
 */
export class BuildParamNameService {
  buildProgramName(
    programBaseName: string,
    programEnums: Array<KeyValueModel>,
    programAliasEnums: Array<KeyValueModel>
  ): string {
    return this.baseBuildName(
      programBaseName, programEnums, programAliasEnums
    );
  }

  buildCommandName(
    commandBaseName: string,
    commandEnums: Array<KeyValueModel>,
    commandAliasEnums: Array<KeyValueModel>
  ): string {
    return this.baseBuildName(
      commandBaseName, commandEnums, commandAliasEnums
    );
  }

  buildArgumentName(
    paramType: string,
    paramName: string,
    argumentEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    if (paramType === ParamTypeEnum.argument) {
      const argument = argumentEnums
        .find(argumentItem => argumentItem.value === paramName);
      return argument ? argument.key : BaseParamTypeEnum.unknown;
    }
    if (paramType === ParamTypeEnum.alias) {
      const alias = aliasEnums
        .find(aliasItem => aliasItem.value === paramName);
      return alias ? alias.key : BaseParamTypeEnum.unknown;
    }
    throw new Error(`Not supported param type: ${paramType}`);
  }

  // todo: refactor the method
  private baseBuildName(
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
}

// todo: refactor
