import {singleton} from "tsyringe";

import {ParamDtoBuilderService} from "../builder/param-dto-builder.service";
import {ParamDtoService} from "../service/param-dto.service";

@singleton()
/**
 * The director service contains logic composed of
 * param dto builder steps.
 */
export class ParamDtoDirectorService {
    constructor(private readonly paramDtoBuilder: ParamDtoBuilderService) {
    }

    build(argv: string[]): ParamDtoService {
        return this.paramDtoBuilder
            .buildBaseArguments(argv)
            .buildProgram()
            .buildCommand()
            .buildProgramArguments()
            .buildCommandArguments()
            .build();
    }
}
