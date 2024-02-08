import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDto} from "../domain/param-dto";
import {ParamDtoAbstractBuilder} from "../builder/param-dto/param-dto-abstract.builder";

@singleton()
/**
 * The director uses param dto builder to build param dto model.
 */
export class ParamDtoDirector {
    build(
        service: InjectionToken<ParamDtoAbstractBuilder>,
        args: string[]
    ): ParamDto {
        return container.resolve(service)
            .buildBaseArgs(args)
            .buildProgram()
            .buildCommand()
            .buildProgramArgs()
            .buildCommandArgs()
            .build();
    }
}
