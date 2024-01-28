import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDto} from "../domain/param-dto";
import {ParamDtoAbstractBuilder} from "../builder/param-dto/param-dto-abstract.builder";

@singleton()
/**
 * The director service contains logic composed of
 * param dto builder steps.
 */
export class ParamDtoDirector {
    build(abstract: InjectionToken<ParamDtoAbstractBuilder>, argv: string[]): ParamDto {
        return container.resolve(abstract)
            .buildBaseArguments(argv)
            .buildProgram()
            .buildCommand()
            .buildProgramArguments()
            .buildCommandArguments()
            .build();
    }
}
// todo: refactor the code