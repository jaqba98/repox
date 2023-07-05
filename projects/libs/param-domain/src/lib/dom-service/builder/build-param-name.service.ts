import { singleton } from "tsyringe";
import { KeyValueModel } from "@lib/model";
import { EMPTY_STRING } from "@lib/const";

@singleton()
export class BuildParamNameService {
  buildProgramName(
    baseName: string,
    enums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    return this.baseBuildName(baseName, enums, aliasEnums);
  }

  buildCommandName(
    baseName: string,
    enums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    return this.baseBuildName(baseName, enums, aliasEnums);
  }

  buildArgumentName(
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
