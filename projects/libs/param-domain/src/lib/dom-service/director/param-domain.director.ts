import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDomain} from "../domain/param-domain";
import {
    ParamDomainAbstractBuilder
} from "../builder/param-domain-abstract.builder";

@singleton()
/**
 * The director uses param domain builder to build param dto model.
 */
export class ParamDomainDirector {
    build(service: InjectionToken<ParamDomainAbstractBuilder>): ParamDomain {
        return container.resolve(service)
            .buildProgram()
            .buildCommand()
            .buildProgramArgs()
            .buildCommandArgs()
            .build();
    }
}
