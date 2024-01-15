import {singleton} from "tsyringe";

import {ParamDtoEntityModel, ParamDtoModel} from "../../model/param-dto.model";
import {ALIAS_PREFIX, ARGUMENT_PREFIX, EQUAL_SIGN, VALUE_SEPARATOR} from "../../const/param-dto.const";
import {EMPTY_STRING} from "@lib/const";
import {ParamTypeEnum} from "../../enum/param-type.enum";

@singleton()
/** Build the parameter DTO model from the command line parameters. */
export class BuildParamDtoService {
    build(args: string[]): ParamDtoModel {
        return {
            params: args
                .map((arg: string, index: number): Omit<ParamDtoEntityModel, "name" | "values" | "hasManyValues"> => ({
                    baseValue: arg,
                    index: index,
                    type: this.getParamType(arg, index),
                    hasValue: arg.includes(EQUAL_SIGN)
                }))
                .map((param): Omit<ParamDtoEntityModel, "hasManyValues"> => ({
                    ...param,
                    name: this.getParamName(param.baseValue, param.hasValue, param.type),
                    values: this.getParamValues(param.baseValue, param.hasValue)
                }))
                .map((param): ParamDtoEntityModel => ({...param, hasManyValues: param.values.length > 1}))
        };
    }

    private getParamType(arg: string, index: number): ParamTypeEnum {
        if (arg.startsWith(ARGUMENT_PREFIX)) return ParamTypeEnum.argument;
        if (arg.startsWith(ALIAS_PREFIX)) return ParamTypeEnum.alias;
        if (index === 0) return ParamTypeEnum.executor;
        if (index === 1) return ParamTypeEnum.application;
        if (index === 2) return ParamTypeEnum.program;
        return ParamTypeEnum.command;
    }

    private getParamName(baseValue: string, hasValue: boolean, type: ParamTypeEnum): string {
        const name: string = hasValue ? baseValue.split(EQUAL_SIGN)[0] : baseValue;
        if (type === ParamTypeEnum.argument) return name.replace(ARGUMENT_PREFIX, EMPTY_STRING);
        if (type === ParamTypeEnum.alias) return name.replace(ALIAS_PREFIX, EMPTY_STRING);
        return name;
    }

    private getParamValues(baseValue: string, hasValue: boolean): string[] {
        if (!hasValue) return [];
        return baseValue
            .split(EQUAL_SIGN)[1]
            .replace(/\s/g, EMPTY_STRING)
            .replace(/^(["'`])/, EMPTY_STRING)
            .replace(/(["'`])$/, EMPTY_STRING)
            .split(VALUE_SEPARATOR);
    }
}
