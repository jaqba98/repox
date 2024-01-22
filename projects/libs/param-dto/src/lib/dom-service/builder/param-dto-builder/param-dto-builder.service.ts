import {container, singleton} from "tsyringe";

import {ParamDtoService} from "../../service/param-dto.service";
import {ParamDtoBuilderAbstractService} from "./param-dto-builder-abstract.service";
import {deepCopy, getIndexesBetween} from "@lib/utils";
import {ALIAS_PREFIX, ARGUMENT_PREFIX, EQUAL_SIGN, VALUE_SEPARATOR} from "../../../const/param-dto.const";
import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../../model/param-dto.model";

@singleton()
/**
 * The builder contains methods to build every single param dto element.
 */
export class ParamDtoBuilderService implements ParamDtoBuilderAbstractService {
    readonly paramDto: ParamDtoService;

    constructor() {
        this.paramDto = container.resolve(ParamDtoService);
    }

    buildBaseArguments(argv: string[]): ParamDtoBuilderService {
        this.paramDto.baseArguments = deepCopy(argv);
        return this;
    }

    buildProgram(): ParamDtoBuilderService {
        const program = this.paramDto.baseArguments[0];
        if (!program) return this;
        if (program.startsWith(ARGUMENT_PREFIX)) return this;
        if (program.startsWith(ALIAS_PREFIX)) return this;
        this.paramDto.program = this.buildBaseParamDto(0);
        return this;
    }

    buildCommand(): ParamDtoBuilderService {
        const {baseArguments, program} = this.paramDto;
        const command = baseArguments
            .map((baseArgument, index): { baseArgument: string, index: number } => ({baseArgument, index}))
            .find(argument => {
                if (argument.index <= program.index) return false;
                if (argument.baseArgument.startsWith(ARGUMENT_PREFIX)) return false;
                return !argument.baseArgument.startsWith(ALIAS_PREFIX);
            });
        if (!command) return this;
        this.paramDto.command = this.buildBaseParamDto(command.index);
        return this;
    }

    buildProgramArguments(): ParamDtoBuilderService {
        const {program, command} = this.paramDto;
        const programArguments: ArgumentParamDtoModel[] = getIndexesBetween(program.index, command.index)
            .map(index => this.buildArgumentParamDto(index));
        this.paramDto.programArguments = deepCopy(programArguments);
        return this;
    }

    buildCommandArguments(): ParamDtoBuilderService {
        const {baseArguments, command} = this.paramDto;
        const commandArguments: ArgumentParamDtoModel[] = getIndexesBetween(command.index, baseArguments.length)
            .map(index => this.buildArgumentParamDto(index));
        this.paramDto.commandArguments = deepCopy(commandArguments);
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
        const name = this.buildArgumentName(baseParamDto.baseValue, hasValue);
        const values = this.buildArgumentValues(baseParamDto.baseValue, hasValue);
        const hasManyValues = values.length > 1;
        const isAlias = name.length === 1;
        return {...baseParamDto, hasValue, name, values, hasManyValues, isAlias};
    }

    private buildArgumentName(baseValue: string, hasValue: boolean): string {
        const name = hasValue ? baseValue.split(EQUAL_SIGN)[0] : baseValue;
        if (name.startsWith(ARGUMENT_PREFIX)) return name.replace(ARGUMENT_PREFIX, "");
        if (name.startsWith(ALIAS_PREFIX)) return name.replace(ALIAS_PREFIX, "");
        return baseValue;
    }

    private buildArgumentValues(baseValue: string, hasValue: boolean): string[] {
        if (!hasValue) return [];
        return baseValue
            .split(EQUAL_SIGN)[1]
            .replace(/\s/g, "")
            .replace(/^(["'`])/, "")
            .replace(/(["'`])$/, "")
            .split(VALUE_SEPARATOR);
    }
}
