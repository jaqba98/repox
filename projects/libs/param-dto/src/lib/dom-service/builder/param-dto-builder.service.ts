import {container, singleton} from "tsyringe";

import {ParamDtoService} from "../service/param-dto.service";

@singleton()
export class ParamDtoBuilderService {
    private readonly paramDto: ParamDtoService;

    constructor() {
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
        return this;
    }

    build(): ParamDtoService {
        return this.paramDto;
    }
}

// todo: refactor the code