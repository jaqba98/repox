import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoDomain} from "../domain/param-dto.domain";
import {ParamDtoAbstractBuilder} from "../builder/param-dto/param-dto-abstract.builder";

@singleton()
/**
 * The director uses param dto builder to build parameter dto model.
 */
export class ParamDtoDirector {
    build(
        service: InjectionToken<ParamDtoAbstractBuilder>,
        args: string[]
    ): ParamDtoDomain {
        return container.resolve(service)
            .buildBaseArgs(args)
            .buildProgram()
            .buildCommand()
            .buildProgramArgs()
            .buildCommandArgs()
            .build();
    }
}
