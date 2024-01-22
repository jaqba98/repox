import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoService} from "../service/param-dto.service";
import {ParamDtoBuilderAbstractService} from "../builder/param-dto/param-dto-builder-abstract.service";

@singleton()
/**
 * The director service contains logic composed of
 * param dto builder steps.
 */
export class ParamDtoDirectorService {
    build(abstract: InjectionToken<ParamDtoBuilderAbstractService>, argv: string[]): ParamDtoService {
        return container.resolve(abstract)
            .buildBaseArguments(argv)
            .buildProgram()
            .buildCommand()
            .buildProgramArguments()
            .buildCommandArguments()
            .build();
    }
}
