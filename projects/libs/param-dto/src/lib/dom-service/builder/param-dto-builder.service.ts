import {container, singleton} from "tsyringe";

import {ParamDtoService} from "../service/param-dto.service";
import {ParamDtoFinderService} from "../finder/param-dto-finder.service";

@singleton()
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
        if (execPath) this.paramDto.execPath = {baseValue: execPath, index: 0};
        return this;
    }

    buildAppPath(): ParamDtoBuilderService {
        const appPath = this.paramDto.baseArguments[1];
        if (appPath) this.paramDto.appPath = {baseValue: appPath, index: 1};
        return this;
    }

    buildProgram(): ParamDtoBuilderService {
        const program = this.paramDto.baseArguments[2];
        if (program) this.paramDto.program = {baseValue: program, index: 2};
        return this;
    }

    buildCommand(): ParamDtoBuilderService {
        const { baseArguments, program } = this.paramDto;
        const commandIndex = this.paramDtoFinder.findCommandIndex(baseArguments, program.index);
        if (commandIndex === -1) return this;
        const command = baseArguments[commandIndex];
        this.paramDto.command = {baseValue: command, index: commandIndex};
        return this;
    }

    buildProgramArguments(): ParamDtoBuilderService {
        const { baseArguments, program, command } = this.paramDto;
        const args = this.paramDtoFinder.findArgumentsInRange(baseArguments, program.index, command.index);
        this.paramDto.programArguments = [...args];
        return this;
    }

    buildCommandArguments(): ParamDtoBuilderService {
        const { baseArguments, command } = this.paramDto;
        const args = this.paramDtoFinder.findArgumentsInRange(baseArguments, command.index, baseArguments.length);
        this.paramDto.commandArguments = [...args];
        return this;
    }

    build(): ParamDtoService {
        return this.paramDto;
    }
}

// todo: refactor the code