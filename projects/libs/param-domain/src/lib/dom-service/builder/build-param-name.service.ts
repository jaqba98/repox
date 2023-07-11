import { singleton } from "tsyringe";
import { KeyValueModel } from "@lib/model";
import { BaseParamTypeEnum } from "../../enum/base-param-type.enum";
import { ParamTypeEnum } from "@lib/param-dto";
import { EMPTY_STRING } from "@lib/const";

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

  private baseBuildName(
    baseName: string,
    enums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    if (baseName === EMPTY_STRING) return "default";
    const argument = enums
      .find(argumentItem => argumentItem.value === baseName);
    if (argument) {
      return argument.key;
    }
    const alias = aliasEnums
      .find(aliasItem => aliasItem.value === baseName);
    return alias ? alias.key : BaseParamTypeEnum.unknown;
  }
}
