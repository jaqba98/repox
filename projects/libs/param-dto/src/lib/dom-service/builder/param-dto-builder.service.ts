import {container, singleton} from "tsyringe";

import {ParamDtoService} from "../service/param-dto.service";
import {ParamDtoFinderService} from "../finder/param-dto-finder.service";
import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../model/param-dto.model";
import {ALIAS_PREFIX, ARGUMENT_PREFIX, EQUAL_SIGN, VALUE_SEPARATOR} from "../../const/param-dto.const";

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
        const execPath = this.paramDto.baseArguments[0];
        if (execPath) this.paramDto.execPath = this.buildBaseParamDto(execPath, 0);
        return this;
    }

    buildAppPath(): ParamDtoBuilderService {
        const appPath = this.paramDto.baseArguments[1];
        if (appPath) this.paramDto.appPath = this.buildBaseParamDto(appPath, 1);
        return this;
    }

    buildProgram(): ParamDtoBuilderService {
        const program = this.paramDto.baseArguments[2];
        if (program) this.paramDto.program = this.buildBaseParamDto(program, 2);
        return this;
    }

    buildCommand(): ParamDtoBuilderService {
        const {baseArguments, program} = this.paramDto;
        const commandIndex = this.paramDtoFinder.findCommandIndex(baseArguments, program.index);
        if (commandIndex === -1) return this;
        this.paramDto.command = this.buildBaseParamDto(baseArguments[commandIndex], commandIndex);
        return this;
    }

    buildProgramArguments(): ParamDtoBuilderService {
        const {baseArguments, program, command} = this.paramDto;
        const programArguments: ArgumentParamDtoModel[] = this.paramDtoFinder
            .findArgumentsInRange(baseArguments, program.index, command.index)
            .map(argument => ({...this.buildArgumentParamDto(argument)}));
        this.paramDto.programArguments = [...programArguments];
        return this;
    }

    buildCommandArguments(): ParamDtoBuilderService {
        const {baseArguments, command} = this.paramDto;
        const commandArguments: ArgumentParamDtoModel[] = this.paramDtoFinder
            .findArgumentsInRange(baseArguments, command.index, baseArguments.length)
            .map(argument => ({...this.buildArgumentParamDto(argument)}));
        this.paramDto.commandArguments = [...commandArguments];
        return this;
    }

    build(): ParamDtoService {
        return this.paramDto;
    }

    private buildBaseParamDto(baseValue: string, index: number): BaseParamDtoModel {
        return {baseValue, index};
    }

    private buildArgumentParamDto(baseParamDto: BaseParamDtoModel): ArgumentParamDtoModel {
        const hasValue = this.getArgumentHasValue(baseParamDto.baseValue);
        const isAlias = this.getArgumentIsAlias(baseParamDto.baseValue);
        const name = this.getArgumentName(baseParamDto.baseValue, hasValue, isAlias);
        const values = this.getArgumentValues(baseParamDto.baseValue, hasValue);
        const hasManyValues = this.getArgumentHasManyValue(values);
        return {...baseParamDto, hasValue, name, values, hasManyValues, isAlias};
    }

    private getArgumentHasValue(baseValue: string): boolean {
        return baseValue.includes(EQUAL_SIGN);
    }

    private getArgumentIsAlias(baseValue: string): boolean {
        if (baseValue.startsWith(ARGUMENT_PREFIX)) return false;
        return baseValue.startsWith(ALIAS_PREFIX);
    }

    private getArgumentName(baseValue: string, hasValue: boolean, isAlias: boolean): string {
        const name = hasValue ? baseValue.split(EQUAL_SIGN)[0] : baseValue;
        if (isAlias) {
            return name.replace(ALIAS_PREFIX, "");
        }
        return name.replace(ARGUMENT_PREFIX, "");
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

    private getArgumentHasManyValue(values: string[]): boolean {
        return values.length > 1;
    }
}
