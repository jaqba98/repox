import {ParamDomain} from "../domain/param-domain";

/**
 * The abstract builder contains methods which can be implemented
 * in the param domain builder service.
 */
export abstract class ParamDomainAbstractBuilder {
    abstract readonly paramDomain: ParamDomain;

    abstract buildProgram(): ParamDomainAbstractBuilder;

    abstract buildCommand(): ParamDomainAbstractBuilder;

    abstract buildProgramArgs(): ParamDomainAbstractBuilder;

    abstract buildCommandArgs(): ParamDomainAbstractBuilder;

    abstract build(): ParamDomain;
}
