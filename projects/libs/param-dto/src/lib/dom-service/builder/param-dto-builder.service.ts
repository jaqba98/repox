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
        this.paramDto.execPath = {baseValue: this.paramDto.baseArguments[0], index: 0};
        return this;
    }

    buildAppPath(): ParamDtoBuilderService {
        this.paramDto.appPath = {baseValue: this.paramDto.baseArguments[1], index: 1};
        return this;
    }

    buildProgram(): ParamDtoBuilderService {
        this.paramDto.program = {baseValue: this.paramDto.baseArguments[2], index: 2};
        return this;
    }

    build(): ParamDtoService {
        return this.paramDto;
    }
}

// todo: refactor the code