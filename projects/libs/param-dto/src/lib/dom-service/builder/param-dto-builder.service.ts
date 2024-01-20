import {container, singleton} from "tsyringe";

import {ParamDtoService} from "../service/param-dto.service";
import {ParamDtoFinderService} from "../finder/param-dto-finder.service";
import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../model/param-dto.model";
import {ALIAS_PREFIX, ARGUMENT_PREFIX, EQUAL_SIGN, VALUE_SEPARATOR} from "../../const/param-dto.const";
import {getIndexesBetween} from "@lib/utils";

@singleton()
/**
 * The builder contains methods to build every single param dto element.
 */
export class ParamDtoBuilderService {
    private readonly paramDto: ParamDtoService;

    constructor(private readonly paramDtoFinder: ParamDtoFinderService) {
        this.paramDto = container.resolve(ParamDtoService);
    }

    buildBaseArguments(argv: string[]): ParamDtoBuilderService {
        this.paramDto.baseArguments = [...argv];
        return this;
    }

    buildExecPath(): ParamDtoBuilderService {
        this.paramDto.execPath = this.buildBaseParamDto(0);
        return this;
    }

    buildAppPath(): ParamDtoBuilderService {
        this.paramDto.appPath = this.buildBaseParamDto(1);
        return this;
    }

    buildProgram(): ParamDtoBuilderService {
        this.paramDto.program = this.buildBaseParamDto(2);
        return this;
    }

    buildCommand(): ParamDtoBuilderService {
        const {baseArguments, program} = this.paramDto;
        const commandIndex = this.paramDtoFinder.findCommandIndex(baseArguments, program.index);
        this.paramDto.command = this.buildBaseParamDto(commandIndex);
        return this;
    }

    buildProgramArguments(): ParamDtoBuilderService {
        const {program, command} = this.paramDto;
        const programArguments: ArgumentParamDtoModel[] = getIndexesBetween(program.index, command.index)
            .map(index => this.buildArgumentParamDto(index));
        this.paramDto.programArguments = [...programArguments];
        return this;
    }

    buildCommandArguments(): ParamDtoBuilderService {
        const {baseArguments, command} = this.paramDto;
        const commandArguments: ArgumentParamDtoModel[] = getIndexesBetween(command.index, baseArguments.length)
            .map(index => this.buildArgumentParamDto(index));
        this.paramDto.commandArguments = [...commandArguments];
        return this;
    }

    build(): ParamDtoService {
        return this.paramDto;
    }

    private buildBaseParamDto(index: number): BaseParamDtoModel {
        const baseValue = this.paramDto.baseArguments[index];
        return baseValue ? {baseValue, index} : {baseValue: "", index: -1};
    }

    private buildArgumentParamDto(index: number): ArgumentParamDtoModel {
        const baseParamDto = this.buildBaseParamDto(index);
        const hasValue = baseParamDto.baseValue.includes(EQUAL_SIGN);
        const name = this.getArgumentName(baseParamDto.baseValue, hasValue);
        const isAlias = name.length === 1;
        const values = this.getArgumentValues(baseParamDto.baseValue, hasValue);
        const hasManyValues = values.length > 1;
        return {...baseParamDto, hasValue, name, isAlias, values, hasManyValues};
    }

    private getArgumentName(baseValue: string, hasValue: boolean): string {
        const name = hasValue ? baseValue.split(EQUAL_SIGN)[0] : baseValue;
        if (name.startsWith(ARGUMENT_PREFIX)) return name.replace(ARGUMENT_PREFIX, "");
        if (name.startsWith(ALIAS_PREFIX)) return name.replace(ALIAS_PREFIX, "");
        return baseValue;
    }

    private getArgumentValues(baseValue: string, hasValue: boolean): string[] {
        if (!hasValue) return [];
        return baseValue
            .split(EQUAL_SIGN)[1]
            .replace(/\s/g, "")
            .replace(/^(["'`])/, "")
            .replace(/(["'`])$/, "")
            .split(VALUE_SEPARATOR);
    }
}
