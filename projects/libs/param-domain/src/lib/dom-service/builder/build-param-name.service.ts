import {singleton} from "tsyringe";
import {type KeyValueModel} from "@lib/model";
import {BaseParamTypeEnum} from "../../enum/base-param-type.enum";
import {ParamTypeEnum} from "@lib/param-dto";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The builder service is responsible for build name of
 * program, command and argument.
 */
export class BuildParamNameService {
    buildProgramName(
        programBaseName: string,
        programEnums: KeyValueModel[],
        programAliasEnums: KeyValueModel[]
    ): string {
        return this.baseBuildName(
            programBaseName, programEnums, programAliasEnums
        );
    }

    buildCommandName(
        commandBaseName: string,
        commandEnums: KeyValueModel[],
        commandAliasEnums: KeyValueModel[]
    ): string {
        return this.baseBuildName(
            commandBaseName, commandEnums, commandAliasEnums
        );
    }

    buildArgumentName(
        paramType: string,
        paramName: string,
        argumentEnums: KeyValueModel[],
        aliasEnums: KeyValueModel[]
    ): string {
        if (paramType === ParamTypeEnum.argument) {
            const argument = argumentEnums
                .find(argumentItem => argumentItem.value === paramName);
            return (argument != null) ? argument.key : BaseParamTypeEnum.unknown;
        }
        if (paramType === ParamTypeEnum.alias) {
            const alias = aliasEnums
                .find(aliasItem => aliasItem.value === paramName);
            return (alias != null) ? alias.key : BaseParamTypeEnum.unknown;
        }
        throw new Error(`Not supported param type: ${paramType}`);
    }

    private baseBuildName(
        baseName: string,
        enums: KeyValueModel[],
        aliasEnums: KeyValueModel[]
    ): string {
        if (baseName === EMPTY_STRING) return `default`;
        const argument = enums
            .find(argumentItem => argumentItem.value === baseName);
        if (argument != null) {
            return argument.key;
        }
        const alias = aliasEnums
            .find(aliasItem => aliasItem.value === baseName);
        return (alias != null) ? alias.key : BaseParamTypeEnum.unknown;
    }
}

// todo: refactor the code
